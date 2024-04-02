import React, { Fragment } from "react";
import logo from "../assets/images/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { MdLocalPhone, IoMdMail, HiMiniUserCircle, BsFillHandbagFill } = icons;
  const { isLoggedIn, current } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between w-main h-[80px] py-[25px]">
      <div>
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className="w-[234px] object-contain" />
        </Link>
      </div>
      <div className="flex text-[12px]">
        <div className="flex flex-col items-center px-4 border-r">
          <div className="flex items-center gap-2">
            <MdLocalPhone color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </div>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-center px-4 border-r">
          <div className="flex items-center gap-2">
            <IoMdMail color="red" />
            <span className="font-semibold">support@takis.com</span>
          </div>
          <span>Online Support 24/7</span>
        </div>

        {isLoggedIn && current && (
          <>
            <div className="flex items-center justify-center gap-2 px-4 border-r">
              <BsFillHandbagFill color="red" />
              <span>{current?.cart?.length || 0} item</span>
            </div>
            <Menu as="div" className="relative inline-block text-left pl-1">
              <div className="flex items-center justify-center gap-2 px-4 border-r">
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {` ${current?.lastName} ${current?.firstName}`}
                </Menu.Button>
                <HiMiniUserCircle size={24} color={"red"} />
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/${path.MEMBER}/${path.PERSONAL}`}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Account settings
                        </Link>
                      )}
                    </Menu.Item>
                    {current?.role === "admin" && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/${path.ADMIN}/${path.DASHBOARD}`}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Admin workspace
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Logout
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

{
  /* <>
            <div className="flex items-center justify-center gap-2 px-4 border-r">
              <BsFillHandbagFill color="red" />
              <span>0 item</span>
            </div>
            <Link
              className="flex items-center justify-center gap-2 px-4 border-r"
              to={
                current?.role === "admin"
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
            >
              <HiMiniUserCircle size={24} color={"red"} />
              <span>Profile</span>
            </Link>
          </> */
}
