import { productsUrl } from "./utils";

const fetchProducts = async (id: number) => {
  const response = await fetch(productsUrl).catch(err => console.log(err));

  if (response) {
    return response.json();
  }
  return response;
}

export default fetchProducts;
