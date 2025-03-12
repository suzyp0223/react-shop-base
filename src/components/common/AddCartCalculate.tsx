import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

import "../../assets/css/addCartCalculate.css";
import styled from "styled-components";

import { IProduct, productsList } from "../../store/products";
import { MENUS } from '../../constants/category';
import { cartState, cartList, removeFromCart, updateCartQuantity, calculateTotalPrice } from "../../store/cart";
import { TotalPrice } from "./TotalPrice";

const AddCartCalculate = () => {
  const { id } = useParams();
  const [cart, setCart] = useRecoilState(cartState);
  const [products, setProducts] = useState<IProduct[]>([]);
  // const [product, setProduct] = useState<IProduct || null>(null); // ✅ JSON 데이터를 저장할 상태

  useEffect(() => {
    fetch("../../public/products.json") // `public` 폴더 기준으로 JSON 파일 로드
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // console.log("📢 불러온 상품 데이터:", data);
        // 상태에 저장
        setProducts(data);
      })
      .catch((error) => console.error("상품 데이터를 불러오지 못했습니다.", error));
  }, []);

  // ✅ 장바구니 리스트 변환
  const cartItems = cartList(cart, products);

  // console.log("📢 현재 장바구니 상태:", cart);
  // console.log("📢 변환된 장바구니 데이터:", cartItems);


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
        {MENUS.HOME}
        <LiArrow />
        장바구니

        {cartItems.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
          cartItems.map((product) => (
            <div className="addCartFlexWrap" key={product.id}>
              <Link to={`/product/${product.id}`} className="addCartLink">
                <figure className="addCartImgWrap">
                  <img src={product.image} alt={product.title} className="addCartImg" />
                </figure>
              </Link>

              <div className="addCartTextWrap">
                <h2 className="textTitle">{product.title}</h2>
                <p className="textTotalPrice">${Math.round(product.price * product.count)}</p>
                <p className="textOriginPrice">${Math.round(product.price)}</p>

                <div className="textBtnWrap">
                  <div className="btnBox">
                    <button className="btn btn-primary" onClick={() => handleDecrease(Number(product.id))}>-</button>
                    <button className="btn btn-num">{product.count}</button>
                    <button className="btn btn-primary" onClick={() => handleIncrease(Number(product.id))}>+</button>
                  </div>
                  <button className="btn btn-danger" onClick={() => handleRemove(Number(product.id))}>삭제</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ 총 결제 금액 표시 */}
      <TotalPrice />
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
