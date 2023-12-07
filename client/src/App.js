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
} from "./pages/public";
import path from "./utils/path";
import { apiGetCategories } from "./store/app/asyncActions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiGetCategories());
  }, []);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOG} element={<Blogs />} />
          <Route path={path.PRODUCT} element={<Products />} />
          <Route path={path.FAQs} element={<FAQ />} />
          <Route path={path.OUR_SERVICE} element={<Services />} />
          <Route
            path={path.DETAIL_PRODUCT__PID__TITLE}
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
