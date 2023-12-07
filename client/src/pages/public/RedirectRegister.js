import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "../../utils/path";

const RedirectRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "true") {
      Swal.fire({
        title: "Đăng ký tài khoản thành công. Bạn có thể đăng nhập",
        text: "Success",
        icon: "success",
      }).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
    if (status === "false") {
      Swal.fire({
        title: "Đăng ký tài khoản không thành công.",
        text: "Failed",
        icon: "error",
      }).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
  }, []);
  return <div className="w-screen h-screen bg-gray-200"></div>;
};

export default RedirectRegister;
