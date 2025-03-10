import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";

import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import { RecoilRoot } from "recoil";


const App = (): JSX.Element => {
  // Recoil 상태에서 productsList 값 가져오기

  return (
    <RecoilRoot>
      <BrowserRouter>
        <input type="checkbox" id="side-menu" className="drawer-toggle" />
        <section className="drawer-content">
          <Nav />
          <section className="main pt-16">
            <Router />
          </section>
          <Footer />
        </section>
        <Drawer />
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
