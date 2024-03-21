import React, { useEffect, useState } from "react";
import moment from "moment";
import InputForm from "../../components/Input/InputForm";
import { useForm } from "react-hook-form";
import Pagination from "../../components/Pagination/Pagination";
import useDebounce from "../../hooks/useDebounce";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { apiGetProducts } from "../../api/product";

const ManageProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [products, setProducts] = useState([]);

  const [params] = useSearchParams();

  const debounce = useDebounce(watch("q"), 800);

  const navigate = useNavigate();

  const location = useLocation();

  const fetchAllProducts = async (params) => {
    const response = await apiGetProducts({ ...params, limit: 8 });
    if (response?.success) {
      setProducts(response);
    }
  };

  useEffect(() => {
    if (debounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: debounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [debounce]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchAllProducts(queries);
  }, [params]);

  return (
    <div className="relative">
      <h1 className="h-[75px] w-full flex items-center font-bold text-3xl px-4 fixed top-0 border-b bg-gray-200">
        <span>Manage Product</span>
      </h1>
      <div className="h-[75px]"></div>
      <div>
        <div className="flex justify-end text-right mr-3">
          <form>
            <InputForm
              id={"q"}
              placeholder="Search name product or category ..."
              style={"w500"}
              register={register}
              errors={errors}
            />
          </form>
        </div>
        <div class="overflow-x-auto shadow-md ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  #
                </th>
                <th scope="col" class="px-6 py-3">
                  Thumb
                </th>
                <th scope="col" class="px-6 py-3">
                  Name product
                </th>
                <th scope="col" class="px-6 py-3">
                  Brand
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                  Sold
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.products?.map((p, index) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <img
                        src={p.thumb}
                        alt="thumb"
                        className="w-[80px] h-[80px] object-cover"
                      />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {p.title}
                    </th>
                    <td class="px-6 py-4 capitalize">{p.brand}</td>
                    <td class="px-6 py-4">{p.category}</td>

                    <td class="px-6 py-4">{p.price}</td>

                    <td class="px-6 py-4">{p.quantity}</td>

                    <td class="px-6 py-4">{p.sold}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mr-3">
        <Pagination totalCount={products?.counts} />
      </div>
    </div>
  );
};

export default ManageProduct;
