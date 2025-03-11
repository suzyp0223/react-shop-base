import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";

import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import ProductsView from "../components/products/ProductsView";
import ProductsViewLoad from "../components/products/ProductsCartView";


const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route path="/nav" element={<Nav />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/products/:category" element={<ProductsView />} />

      <Route path="/ProductsView" element={<ProductsView />} />
      <Route path="/ProductsViewLoad" element={<ProductsViewLoad />} />

    </Routes>
  );
};

export default memo(Router);
