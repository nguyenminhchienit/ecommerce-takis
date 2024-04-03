import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button, Loading } from "../../components";
import { apiLogin, apiRegister, apiForgotPassword } from "../../api/user";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/user/userSlice";
import { validate } from "../../utils/helpers";
import { showModal } from "../../store/app/appSlice";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const [inValidField, setInValidField] = useState([]);
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const [searchParams] = useSearchParams();

  const resetPayload = () => {
    setPayload({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      mobile: "",
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  console.log({ isLoggedIn, current });

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword(payload);
    if (response?.success) {
      Swal.fire({
        title: "Kiểm tra email để thay đổi mật khẩu",
        icon: "success",
      }).then(() => {
        resetPayload();
      });
    }
  };

  useEffect(() => {
    resetPayload();
    setInValidField([]);
  }, [isRegister]);

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, mobile, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInValidField)
      : validate(data, setInValidField);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        console.log("Check res regi: ", response);
        if (response?.success) {
          Swal.fire({
            title: "You had register successfully",
            text: response?.mes,
            icon: "success",
          }).then(() => {
            setIsRegister(false);
            resetPayload();
          });
        } else {
          Swal.fire({
            title: "Oops",
            text: response?.mes,
            icon: "error",
          });
        }
      } else {
        const response = await apiLogin(data);
        if (response?.success) {
          dispatch(
            register({
              isLoggedIn: true,
              token: response.access_token,
              userData: response.data,
            })
          );
          if (searchParams.get("redirect")) {
            navigate(searchParams.get("redirect"));
          } else {
            navigate(`/${path.HOME}`);
          }
        } else {
          Swal.fire({
            title: "Oops",
            text: response?.mes || "Mật khẩu hoặc tài khoản chưa chính xác",
            icon: "error",
          });
        }
      }
    }
  }, [payload, isRegister]);
  return (
    <div>
      <div className="relative">
        <img
          src="https://static.vecteezy.com/system/resources/previews/005/454/932/original/mobile-phone-represent-of-front-of-shop-store-shopping-online-on-website-or-mobile-application-concept-marketing-and-digital-marketing-free-vector.jpg"
          alt="background"
          className="object-cover w-screen h-screen"
        />
        <div className="absolute top-0 right-0 bottom-0 left-1/2 flex items-center justify-center">
          <div className="bg-white w-[500px] p-8 rounded-md">
            {!isShowForgotPassword ? (
              <div>
                <h1 className="text-main font-semibold text-[20px] text-center mb-4">
                  {isRegister ? "Register" : "Login"}
                </h1>

                {isRegister && (
                  <div className="flex items-center gap-2">
                    <InputField
                      type={"text"}
                      nameKey={`firstName`}
                      value={payload.firstName}
                      setValue={setPayload}
                      inValidField={inValidField}
                      setInValidField={setInValidField}
                    />
                    <InputField
                      type={"text"}
                      nameKey={`lastName`}
                      value={payload.lastName}
                      setValue={setPayload}
                      inValidField={inValidField}
                      setInValidField={setInValidField}
                    />
                  </div>
                )}
                <InputField
                  type={"email"}
                  nameKey={`email`}
                  value={payload.email}
                  setValue={setPayload}
                  inValidField={inValidField}
                  setInValidField={setInValidField}
                />
                {isRegister && (
                  <InputField
                    type={"mobile"}
                    nameKey={`mobile`}
                    value={payload.mobile}
                    setValue={setPayload}
                    inValidField={inValidField}
                    setInValidField={setInValidField}
                  />
                )}
                <InputField
                  type={"password"}
                  nameKey={`password`}
                  value={payload.password}
                  setValue={setPayload}
                  inValidField={inValidField}
                  setInValidField={setInValidField}
                />

                <Button
                  name={isRegister ? "Register" : "Login"}
                  handleOnClick={handleSubmit}
                  fw={true}
                />

                <div className="flex justify-between items-center mt-3 text-sm">
                  {!isRegister && (
                    <span
                      className="text-blue-500 hover:underline cursor-pointer 
                    "
                      onClick={() => setIsShowForgotPassword(true)}
                    >
                      Forgot your account?
                    </span>
                  )}
                  {!isRegister && (
                    <span
                      className="text-blue-500 hover:underline cursor-pointer"
                      onClick={() => setIsRegister(true)}
                    >
                      Create account
                    </span>
                  )}
                  {isRegister && (
                    <span
                      className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                      onClick={() => setIsRegister(false)}
                    >
                      Go to login
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between items-center">
                <h1 className="text-main font-semibold text-[20px] text-center">
                  {"Forgot password"}
                </h1>

                <InputField
                  type={"email"}
                  nameKey={`email`}
                  value={payload.email}
                  setValue={setPayload}
                  inValidField={inValidField}
                  setInValidField={setInValidField}
                />

                <Button
                  name={"Submit"}
                  handleOnClick={handleForgotPassword}
                  fw={true}
                />
                <span
                  className="text-blue-500 hover:underline cursor-pointer w-full mt-3 text-center"
                  onClick={() => setIsShowForgotPassword(false)}
                >
                  Go to login
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
