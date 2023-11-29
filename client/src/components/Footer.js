import React, { memo } from "react";

const Footer = () => {
  return (
    <div className="mt-[30px] w-full">
      <div className="flex h-[108px] justify-center items-center bg-[#ee3131]">
        <div className="flex w-main items-center">
          <div className=" flex flex-1 flex-col">
            <span className="text-[20px] text-gray-300">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[12px] text-gray-100">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1">
            <input
              type="email"
              placeholder="Email address"
              className=" w-full rounded-full h-[50px] outline-none text-gray-100 p-4 placeholder:text-gray-200 placeholder:text-sm placeholder:opacity-50 bg-[#F04646]"
            />
          </div>
        </div>
      </div>

      <div className="h-[300px] bg-black flex justify-center items-center">
        <div className="w-main flex">
          <div className="flex-2 text-white">
            <h3 className="border-l-4 pl-2 border-main uppercase">About Us</h3>
            <ul className="mt-[20px] flex flex-col gap-3">
              <li className="text-gray-100 text-sm">
                <span className="text-gray-200 font-semibold">Address:</span>{" "}
                474 Vo Van Ngan, Thu Duc, Ho Chi Minh City
              </li>
              <li className="text-gray-100 text-sm">
                <span className="text-gray-200 font-semibold">Phone:</span>{" "}
                (+1800) 888 8888
              </li>
              <li className="text-gray-100 text-sm">
                <span className="text-gray-200 font-semibold">Mail:</span>{" "}
                support@takis.com
              </li>
            </ul>
          </div>
          <div className="flex-1 text-white">
            <h3 className="border-l-4 pl-2 border-main uppercase">
              Information
            </h3>
            <ul className="mt-[20px] flex flex-col gap-3 text-gray-100 text-sm">
              <li className="">Typography</li>
              <li className="">Gallery</li>
              <li className="">Store Location</li>
              <li className="">Today Deals</li>
              <li className="">Contact</li>
            </ul>
          </div>
          <div className="flex-1 text-white">
            <h3 className="border-l-4 pl-2 border-main uppercase">
              Who we are
            </h3>
            <ul className="mt-[20px] flex flex-col gap-3 text-gray-100 text-sm">
              <li className="">Help</li>
              <li className="">Free Shipping</li>
              <li className="">FAQs</li>
              <li className="">Return & Exchange</li>
              <li className="">Testimonials</li>
            </ul>
          </div>
          <div className="flex-1 text-white">
            <h3 className="border-l-4 pl-2 border-main uppercase">Services</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
