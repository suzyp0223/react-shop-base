import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";
import { IProduct } from "./products";
import { getStorageItem } from "../utils/utils";

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

export interface ICartProduct extends IProduct {
  count: number;
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
export const cartList = (cart: ICartState, products: IProduct[]): ICartProduct[] => {
  if (!cart.items) return [];

  return Object.keys(cart.items)
    .map((id) => {
      const product = products.find((p) => p.id === Number(id));
      if (!product) return null;
      return {
        ...product, // ✅ 기존 상품 정보 유지
        count: cart.items?.[Number(id)]?.count ?? 1, // ✅ count가 없으면 기본값 1
      };
    })
    .filter((item): item is ICartProduct => item !== null);
};


// 없으면 빈 배열 초기화
let store = getStorageItem("store") || [];
let cart = getStorageItem("cart") || [];

//상품찾기
export const findProduct = (id: number) => {
  return store.find((product) => product.id === id) || null;
};

// 상품존재 확인
export const existCartProduct = (id: number) => {
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    return findProduct(id);
  }
  return item;
};

// addToCart
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
export const removeFromCart = (cart: ICartState, id: string): ICartState => {
  const updatedCart = { ...cart.items };
  delete updatedCart[id];
  return { items: updatedCart };
};

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

  return cartList(cart, products).reduce((total, item) => total + item.price * item.count, 0);
};
