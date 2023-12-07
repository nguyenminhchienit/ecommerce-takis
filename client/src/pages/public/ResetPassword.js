import React, { useState } from "react";
import { Button, InputField } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { apiResetPassword } from "../../api/user";
import Swal from "sweetalert2";
import path from "../../utils/path";

const ResetPassword = () => {
  const [payload, setPayload] = useState({
    password: "",
  });

  const { token } = useParams();
  const navigate = useNavigate();

  const resetPayload = () => {
    setPayload({
      password: "",
    });
  };

  const handleChangePassword = async () => {
    const data = {
      token,
      ...payload,
    };
    const response = await apiResetPassword(data);
    if (response?.success) {
      Swal.fire({
        title: response?.mes,
        icon: "success",
      }).then(() => {
        navigate(`/${path.LOGIN}`);
        resetPayload();
      });
    }
  };
  return (
    <div className="w-main flex flex-col items-center m-auto">
      <h1 className="text-main font-semibold text-[20px] text-center mt-10">
        {"Nhập lại mật khẩu mới của bạn"}
      </h1>
      <InputField
        type={"password"}
        nameKey={`password`}
        value={payload.password}
        setValue={setPayload}
      />

      <Button
        name={"Xác nhận"}
        handleOnClick={handleChangePassword}
        fw={true}
      />
    </div>
  );
};

export default ResetPassword;
