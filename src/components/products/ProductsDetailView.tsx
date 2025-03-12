import '../../assets/css/productsDetailView.css';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { IProduct, productsList, } from '../../store/products';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Category } from '../../constants/category';
import Rating from '../common/Rating';
import { addToCart, cartState } from '../../store/cart';


export default function ProductsDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const products = useRecoilValue(productsList);
  const [cart, setCart] = useRecoilState(cartState);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === Number(id));
      setProduct(foundProduct ?? null);
    }
  }, [id, products]);



  const handleAddToCart = () => {
    if (!product) return <h2>상품을 찾을 수 없습니다.</h2>;

    setCart((prevCart) => addToCart(prevCart, product));
    navigate("/cart");
  };


  return (
    <>
      <div className='detail-wrapper'>
        <div className='detail-category'>
          {product?.category && product.category in Category
            ? Category[product.category as keyof typeof Category]
            : product?.category}
          <LiArrow />
          <div>{product?.title}</div>
        </div>

        <section>
          <div className='detail-productWrap'>
            <figure className="img-figure">
              <img src={product?.image} alt={product?.title} className="detail-img" />
            </figure>

            <div className="text-rate-wrap">
              <h2 className="text-rate-title">{product?.title}
                <span className="text-newIcon">NEW</span>
              </h2>

              <p className="text-rate-desc">{product?.description}</p>

              <div className='text-rating-box'>
                <Rating rate={product?.rating?.rate} count={product?.rating?.count} />
              </div>

              <p className="text-rate-price">${Math.round(product?.price || 0)}</p>

              <div className="button-box">
                <button className="pickUp-btn" onClick={handleAddToCart}>장바구니에 담기</button>
                <Link className="move-btn" to={"/cart"}>장바구니로 이동</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};


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