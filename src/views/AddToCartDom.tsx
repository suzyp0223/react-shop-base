import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import "../assets/css/addToCartDom.css";

import { ProductsTitle } from "../components/products/ProductsTitle";
import { IProduct } from "../store/products";
import { cartState } from "../components/carts/cartState";

type ProductPreview = Pick<IProduct, "id" | "category" | "title" | "price" | "image">;

const AddToCartDom = ({ products }: { products: ProductPreview[] }) => {
  const [cartCount, setCartCount] = useRecoilState(cartState);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // ✅ 특정 상품의 수량을 증가/감소하는 함수
  const updateQuantity = (id: number, amount: number) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[id] || 1) + amount);
      return { ...prev, [id]: newQuantity };
    });

    // ✅ 전체 장바구니 개수 업데이트 (cartState는 전체 개수를 저장)
    setCartCount((prev) => Math.max(0, prev + amount));
  };

  // ✅ 전체 장바구니 총 가격 계산 (reduce() 사용 X)
  let totalPrice = 0;
  Object.keys(quantities).forEach((key) => {
    const product = products.find((p) => p.id === Number(key));
    if (product) {
      totalPrice += Number(product.price) * quantities[Number(key)];
    }
  });

  return (
    <>
      <ProductsTitle /> 장바구니
      <div className="wrap">

        {(() => {
          const productElements: JSX.Element[] = [];

          Object.keys(quantities).forEach((key) => {
            const product = products.find((p) => p.id === Number(key));
            if (product) {
              const quantity = quantities[product.id] || 1;

              productElements.push(
                <div className="addCartFlexWrap" key={product.id}>
                  <Link to={`/product/${product.id}`} className="addCartLink">
                    <figure className="addCartImgWrap">
                      <img src={product.image} alt={product.title} className="addCartImg" />
                    </figure>
                  </Link>

                  <div className="addCartTextWrap">
                    <h2 className="textTitle">{product.title}</h2>
                    <p className="textTotalPrice">${Math.round(totalPrice)}</p>
                    <p className="textOriginPrice">${Math.round(Number(product.price))}</p>

                    <div className="textBtnWrap">
                      <div className="btnBox">
                        <button className="btn btn-primary" onClick={() => updateQuantity(product.id, -1)}>-</button>
                        <button className="btn btn-num">{quantity}</button>
                        <button className="btn btn-primary" onClick={() => updateQuantity(product.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          });

          return productElements;

        })()}
      </div>

      {/* ✅ 총 결제 금액 표시 */}
      <div className="cartTotalWrap">
        <h2>총 결제 금액: <span className="cartTotalPrice">${Math.round(totalPrice)}</span></h2>
      </div>
    </>
  );
};

export default AddToCartDom;
