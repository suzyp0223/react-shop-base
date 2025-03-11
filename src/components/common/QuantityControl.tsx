import React from "react";

interface QuantityControlProps {
  productId: number;
  price: number;
  quantity: number;
  updateQuantity: (id: number, amount: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ productId, price, quantity, updateQuantity }) => {
  return (
    <div className="textBtnWrap">
      <div className="btnBox">
        {/* ✅ 개별 상품 총 가격 표시 (수량 × 가격) */}
        <p className="textTotalPrice">총 가격: ${Math.round(price * quantity)}</p>
        {/* ✅ 개별 상품 수량 감소 */}
        <button className="btn btn-primary" onClick={() => updateQuantity(productId, -1)}>
          -
        </button>

        {/* ✅ 개별 상품 수량 표시 */}
        <button className="btn btn-num">{quantity}</button>

        {/* ✅ 개별 상품 수량 증가 */}
        <button className="btn btn-primary" onClick={() => updateQuantity(productId, 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityControl;
