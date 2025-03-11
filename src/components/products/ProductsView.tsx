import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { productsList } from '../../store/products';
import { ProductsMain } from './ProductsMain';
import { ProductsTitle } from './ProductsTitle';
import { Category } from "../../constants/category"; // ✅ Category 가져오기

export default function ProductsView() {
  const { category } = useParams<{ category: string }>();
  const products = useRecoilValue(productsList);


  const categoryMap: Record<string, string> = {
    fashion: "패션",
    accessory: "액세서리",
    digital: "디지털",
  };
  const koreanCategory = category ? categoryMap[category] : "";

  const filteredProducts = products.filter((product) => Category[product.category] === koreanCategory);

  return (
    <section className="products-view">
        <ProductsTitle />
      <ProductsMain products={filteredProducts} />
    </section>
  )

}