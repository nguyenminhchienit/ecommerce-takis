import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
import { apiLogin, apiRegister } from "../../api/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/user/userSlice";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);
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

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
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
        navigate(`/${path.HOME}`);
      } else {
        Swal.fire({
          title: "Oops",
          text: response?.mes,
          icon: "error",
        });
      }
    }
  }, [payload, isRegister]);
  return (
    <div className="relative">
      <img
        src="https://static.vecteezy.com/system/resources/previews/005/454/932/original/mobile-phone-represent-of-front-of-shop-store-shopping-online-on-website-or-mobile-application-concept-marketing-and-digital-marketing-free-vector.jpg"
        alt="background"
        className="object-cover w-screen h-screen"
      />
      <div className="absolute top-0 right-0 bottom-0 left-1/2 flex items-center justify-center">
        <div className="bg-white min-w-[500px] p-8 rounded-md">
          <h1 className="text-main font-semibold text-[20px] text-center">
            {isRegister ? "Register" : "Login"}
          </h1>

          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                type={"text"}
                nameKey={`firstName`}
                value={payload.firstName}
                setValue={setPayload}
              />
              <InputField
                type={"text"}
                nameKey={`lastName`}
                value={payload.lastName}
                setValue={setPayload}
              />
            </div>
          )}
          <InputField
            type={"email"}
            nameKey={`email`}
            value={payload.email}
            setValue={setPayload}
          />
          {isRegister && (
            <InputField
              type={"mobile"}
              nameKey={`mobile`}
              value={payload.mobile}
              setValue={setPayload}
            />
          )}
          <InputField
            type={"password"}
            nameKey={`password`}
            value={payload.password}
            setValue={setPayload}
          />

          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw={true}
          />

          <div className="flex justify-between items-center mt-3 text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
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
      </div>
    </div>
  );
};

export default Login;
