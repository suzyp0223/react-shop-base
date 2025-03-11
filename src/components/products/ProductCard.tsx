import { useNavigate } from "react-router-dom";
import { productsList } from "../../store/products";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
    </div>
  );
};