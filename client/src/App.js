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

import AdminLayout from "./pages/admin/AdminLayout";
import DashBoard from "./pages/admin/Dashboard";
import ManageOrder from "./pages/admin/ManageOrder";
import ManageProduct from "./pages/admin/ManageProduct";
import ManageUser from "./pages/admin/ManageUser";
import CreateProduct from "./pages/admin/CreateProduct";
import MemberLayout from "./pages/private/MemberLayout";
import Personal from "./pages/private/Personal";
import path from "./utils/path";
import { apiGetCategories } from "./store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "../src/pages/private/History";
import Wishlist from "../src/pages/private/WishList";
import MyCart from "../src/pages/private/MyCart";
function App() {
  const dispatch = useDispatch();
  const { isShowModal, childrenModal } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(apiGetCategories());
  }, []);
  return (
    <div className="font-main relative h-screen">
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
        {/* Admin */}
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>
        {/* Member */}
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
          <Route path={path.MY_CART} element={<MyCart />} />
        </Route>
        {/* Login */}
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.REDIRECT_REGISTER} element={<RedirectRegister />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
