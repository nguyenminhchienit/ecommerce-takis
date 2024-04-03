import React, { useCallback, useState } from "react";
import SelectQuantity from "../../components/SelectQuantity";
import { Link } from "react-router-dom";
import path from "../../utils/path";
import { useSelector } from "react-redux";
import formatPrice from "../../utils/formatPrice";
import { apiRemoveCart } from "../../api/user";
import { apiGetUserCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import withBaseComponent from "../hocs/withBaseComponent";

const DetailCart = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(null);

  const handleDeleteProductInCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response?.success) {
      dispatch(apiGetUserCurrent());
    } else {
      toast.error(response?.data);
    }
  };

  const handleSetQuantity = useCallback(
    (data) => {
      setQuantity(data);
    },
    [quantity]
  );

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 h-[70px] flex justify-center flex-col mt-3">
        <div className="ml-2">
          <div className="font-bold text-gray-500">My cart</div>
        </div>
      </div>

      <div class="container mx-auto mt-10">
        <div class="sm:flex shadow-md my-10">
          <div class="  w-full  sm:w-3/4 bg-white px-10 py-10">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">
                {current?.cart?.length} Items
              </h2>
            </div>

            {current?.cart?.map((item) => (
              <div class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                <div class="md:w-4/12 2xl:w-1/4 w-full">
                  <img
                    src={item?.thumbnail}
                    alt="Black Leather Purse"
                    class="h-full object-center object-cover md:block hidden"
                  />
                  <img
                    src={item?.thumbnail}
                    alt="Black Leather Purse"
                    class="md:hidden w-full h-full object-center object-cover"
                  />
                </div>
                <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <p class="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                    Tên sản phẩm
                  </p>
                  <div class="flex items-center justify-between w-full">
                    <p class="text-base font-black leading-none text-gray-800">
                      {item?.title}
                    </p>
                    <SelectQuantity
                      defaultValue={item?.quantity}
                      onQuantity={handleSetQuantity}
                      data={item}
                    />
                  </div>
                  <p class="text-xs leading-3 text-gray-600 py-4">
                    Color: {item?.color}
                  </p>

                  <div class="flex items-center justify-between pt-5">
                    <div class="flex itemms-center">
                      <p class="text-xs leading-3 underline text-gray-800 cursor-pointer">
                        Add to favorites
                      </p>
                      <p
                        class="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                        onClick={() =>
                          handleDeleteProductInCart(
                            item?.product?._id,
                            item?.color
                          )
                        }
                      >
                        Remove
                      </p>
                    </div>
                    <p class="text-base font-black leading-none text-gray-800">
                      {formatPrice(item?.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to={`/${path.PRODUCT}`}
              class="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                class="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div
            id="summary"
            class=" w-full   sm:w-1/4   md:w-1/2     px-8 py-10"
          >
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-sm uppercase">
                {current?.cart?.length} items
              </span>
              <span class="font-semibold text-sm">
                {formatPrice(
                  current?.cart?.reduce(
                    (sum, item) => sum + Number(item?.price) * item?.quantity,
                    0
                  )
                )}
              </span>
            </div>
            <div>
              <label class="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
            </div>
            <div class="py-10">
              <label
                for="promo"
                class="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                class="p-2 text-sm w-full"
              />
            </div>
            <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>
                  {formatPrice(
                    current?.cart?.reduce(
                      (sum, item) => sum + Number(item?.price) * item?.quantity,
                      0
                    )
                  )}
                </span>
              </div>
              <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(DetailCart);
