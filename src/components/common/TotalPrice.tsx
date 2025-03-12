import "../../assets/css/totalPrice.css";

import { useRecoilState } from "recoil";
import { useState } from "react";
import { IProduct } from "../../store/products";
import { calculateTotalPrice, cartList, ICartState, cartState } from "../../store/cart";
import Confirm from "./Confirm";

export const TotalPrice = () => {
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const [products, setProducts] = useState<IProduct[]>([]);


  const cartItems = cartList(cart, products);
  const totalPrice = calculateTotalPrice(cart, products);
  return (
    <>
      <div className="cartTotalWrap">
        <h2>총 : <span className="cartTotalPrice">${Math.round(totalPrice)}</span></h2>
        <label htmlFor="buy-modal" className="buy-modal-btn">구매하기</label>
        <input type="checkbox" id="buy-modal" className="buy-modal-toggle" />
      </div>

      <Confirm />
    </>
  );
}
