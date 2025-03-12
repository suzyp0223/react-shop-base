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
        <p className="textTotalPrice">총 가격: ${Math.round(price * quantity)}</p>
        <button className="btn btn-primary" onClick={() => updateQuantity(productId, -1)}>
          -
        </button>

        <button className="btn btn-num">{quantity}</button>

        <button className="btn btn-primary" onClick={() => updateQuantity(productId, 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityControl;
