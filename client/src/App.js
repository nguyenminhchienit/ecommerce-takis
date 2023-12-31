import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Services,
  Blogs,
  Products,
  DetailProduct,
  FAQ,
  RedirectRegister,
  ResetPassword,
  ProductCategory,
} from "./pages/public";
import path from "./utils/path";
import { apiGetCategories } from "./store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal/Modal";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, childrenModal } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(apiGetCategories());
  }, []);
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{childrenModal}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOG} element={<Blogs />} />
          <Route path={path.PRODUCT} element={<Products />} />
          <Route path={path.FAQs} element={<FAQ />} />
          <Route path={path.OUR_SERVICE} element={<Services />} />
          <Route path={path.PRODUCT__CATEGORY} element={<ProductCategory />} />
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.REDIRECT_REGISTER} element={<RedirectRegister />} />
      </Routes>
    </div>
  );
}

export default App;
