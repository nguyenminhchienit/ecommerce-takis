import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const handleSubmit = useCallback(() => {
    console.log("Check payload: ", payload);
  }, [payload]);
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
            <InputField
              type={"text"}
              nameKey={`name`}
              value={payload.name}
              setValue={setPayload}
            />
          )}
          <InputField
            type={"email"}
            nameKey={`email`}
            value={payload.email}
            setValue={setPayload}
          />
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
