import { Link, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

import "../../assets/css/addCartCalculate.css";
import styled from "styled-components";

import { IProduct, productsList } from "../../store/products";
import { MENUS } from '../../constants/category';
import { cartState, cartList, removeFromCart, updateCartQuantity, calculateTotalPrice, ICartProduct } from "../../store/cart";
import { TotalPrice } from "./TotalPrice";

const AddCartCalculate = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useState<ICartProduct[]>([]);
  const products = useRecoilValue(productsList);

  useEffect(() => {
    setCartItems(cartList(cart, products));
  }, [cart, products]);

  // ✅ 상품 수량 증가
  const handleIncrease = (id: number) => {
    setCart(updateCartQuantity(cart, id, 1));
  };

  // ✅ 상품 수량 감소
  const handleDecrease = (id: number) => {
    setCart(updateCartQuantity(cart, id, -1));
  };

  // ✅ 상품 삭제
  const handleRemove = (id: number) => {
    setCart(removeFromCart(cart, String(id)));
  };

  // ✅ 총 가격 계산
  const totalPrice = calculateTotalPrice(cart, products);



  return (
    <>
      <div className="wrap">

          {cartItems.map((product) => (
            <div className="addCartFlexWrap" key={product.id}>
              <Link to={`/product/${product.id}`} className="addCartLink">
                <figure className="addCartImgWrap">
                  <img src={product.image} alt={product.title} className="addCartImg" />
                </figure>
              </Link>

              <div className="addCartTextWrap">
                <h2 className="textTitle">{product.title}</h2>
                <span className="textTotalPrice textPrice">${Math.round(product.price * product.count)}</span>
                <span className="textOriginPrice textPrice">(${Math.round(product.price)})</span>

                <div className="textBtnWrap">
                  <div className="btnBox">
                    <button className="btn btn-primary-left" onClick={() => handleDecrease(Number(product.id))}>-</button>
                    <button className="btn btn-num">{product.count}</button>
                    <button className="btn btn-primary-right" onClick={() => handleIncrease(Number(product.id))}>+</button>
                  </div>
                  {/* <button className="btn btn-danger" onClick={() => handleRemove(Number(product.id))}>삭제</button> */}
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* ✅ 총 결제 금액 표시 */}
      {/* <TotalPrice /> */}
    </>
  );
};


export const CartTotalWrap = styled.div`
  margin-top: 50px;
  margin-left: 10px;
  border: 1ps solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  border-top: 2px solid #ddd;
  width: 61rem;
  height: 3rem;
;`



const LiArrow = styled.i`
    position: relative;
    padding-left: 1.3em;
    margin-left: 0.5rem;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 0.375rem;
        height: 0.375rem;
        border-top: 1px solid black;
        border-right: 1px solid black;
        opacity: 0.4;
`;

export default AddCartCalculate;
