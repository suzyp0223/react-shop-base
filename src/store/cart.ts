import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";
import { IProduct } from "./products";



export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

export interface ICartItems {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화 됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});


/**
 * cartList를 구현 하세요.
 * id, image, count 등을 return합니다.
 */
export const cartList = (cart: ICartState, products: IProduct[]): ICartItems[] => {
  if (!cart.items) return [];

  return Object.keys(cart.items)
    .map((id) => {
      const product = products.find((p) => p.id === Number(id));
      if (!product) return null;
      return {
        id: id,
        title: product.title,
        price: product.price,
        count: cart.items![Number(id)].count,
        image: product.image,
      };
    })
    .filter((item): item is ICartItems => item !== null);
};

// addToCart는 구현 해보세요.
export const addToCart = (cart: ICartState, product: IProduct): ICartState => {
  const tempCart = { ...cart.items };

  if (tempCart[product.id]) {
    tempCart[product.id] = { ...tempCart[product.id], count: tempCart[product.id].count + 1 };
  } else {
    tempCart[product.id] = { id: product.id, count: 1 };
  }

  return { items: tempCart };
};

// removeFromCart는 참고 하세요.
export const removeFromCart = (cart: ICartState, id: string) => {
  const tempCart = { ...cart };
  if (tempCart[id].count === 1) {
    delete tempCart[id];
    return tempCart;
  } else {
    return { ...tempCart, [id]: { id: id, count: cart[id].count - 1 } };
  }
};

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */

export const updateCartQuantity = (cart: ICartState, id: number, amount: number): ICartState => {
  const tempCart = { ...cart.items };

  if (tempCart[id]) {
    const newCount = Math.max(1, tempCart[id].count + amount);
    tempCart[id] = { ...tempCart[id], count: newCount };
  }

  return { items: tempCart };
};

export const calculateTotalPrice = (cart: ICartState, products: IProduct[]): number => {
  if (!cart.items) return 0;

  return Object.keys(cart.items).reduce((total, id) => {
    const product = products.find((p) => p.id === Number(id));
    if (!product) return total;
    return total + product.price * cart.items![Number(id)].count;
  }, 0);
};