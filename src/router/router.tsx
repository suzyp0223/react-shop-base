import { Routes, Route } from "react-router-dom";
import { memo } from "react";

import Error from "../views/Error";
import Index from "../views/Index";
import ProductsView from "../components/products/ProductsView";
import ProductsDetailView from "../components/products/ProductsDetailView";
import CartView from "../components/carts/CartView";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route path="/products/:category" element={<ProductsView />} />
      <Route path="/product/:id" element={<ProductsDetailView />} />
      <Route path="/cart" element={<CartView />} />
    </Routes>
  );
};

export default memo(Router);
