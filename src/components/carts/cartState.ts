import { atom } from "recoil";

export const cartState = atom<number>({
  key: "cartState", //고유 key값
  default: 0, //기본값 (장바구니에 담긴 상품 개수)
});
