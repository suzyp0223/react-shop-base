import { atom } from "recoil";

export interface CartItem {
  id: number;
  quantity: number;
}

export const cartState = atom<number>({
  key: "cartState", //고유 key값
  default: 0, //기본값 (장바구니에 담긴 상품 개수)
});
// export const cartArrayState= atom<CartItem[]>({
//   key: "cartState", //고유 key값
//   default: [], //기본값 (장바구니에 담긴 상품 개수)
// });
