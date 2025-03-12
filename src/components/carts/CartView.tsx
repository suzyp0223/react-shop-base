import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import AddCartCalculate from "../common/AddCartCalculate";
import { cartState } from "../../store/cart";
import { useEffect, useState } from "react";
import { TotalPrice } from "../common/TotalPrice";
import { useRecoilValue } from "recoil";

const CartView = (): JSX.Element => {
  const cart = useRecoilValue(cartState);
  const [cartEmpty, setCartEmpty] = useState<boolean>(true);

  // 컴포넌트 마운트시 장바구니 상태 확인
  useEffect(() => {
    setCartEmpty(!cart.items || Object.keys(cart).length === 0);
  }, [cart]);

  return (
    <>
      <BreadCrumb category="홈" crumb="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0"
        style={{minHeight:"30vh"}}>

        {cartEmpty ? (
          <div style={{ marginLeft: "20px", flex: "1" }}>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary cartView-btn mt-10">
              담으러 가기
            </Link>
          </div>

        ) : (

          <AddCartCalculate />

        )}
      </div>
      <Confirm />
      <TotalPrice />

    </>
  );
};

export default CartView;
