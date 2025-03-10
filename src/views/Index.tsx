import { useRecoilValue } from "recoil";
import Slider from "../components/common/Slider";
import { ProductsMain } from "../components/products/ProductsMain";
import { productsList } from "../store/products";

const Index = (): JSX.Element => {
  const products = useRecoilValue(productsList);


  return (
    <>
      <Slider />
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        <ProductsMain products={products} />
      </section>
    </>
  );
};

export default Index;
