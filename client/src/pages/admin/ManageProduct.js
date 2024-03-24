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
import { apiGetProducts, apiDeleteProduct } from "../../api/product";
import UpdateProduct from "./UpdateProduct";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAddComment } from "react-icons/md";
import AddVariants from "./AddVariants";

const ManageProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [customizeVariants, setCustomizeVariants] = useState(null);
  const [update, setUpdate] = useState(false);

  const [params] = useSearchParams();

  const debounce = useDebounce(watch("q"), 500);

  const navigate = useNavigate();

  const location = useLocation();

  const render = () => {
    setUpdate(!update);
  };

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
  }, [params, update]);

  const handleDeleteProduct = async (pid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure remove this product?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response.success) {
          toast.success(response.mes);
          render();
        } else {
          toast.error(response.mes);
        }
      }
    });
  };

  return (
    <div className="relative pl-4">
      {product && (
        <div className="absolute inset-0 bg-gray-200 min-h-screen z-50">
          <UpdateProduct
            product={product}
            setProduct={setProduct}
            render={render}
          />
        </div>
      )}
      {customizeVariants && (
        <div className="absolute inset-0 bg-gray-200 min-h-screen z-50">
          <AddVariants
            customizeVariants={customizeVariants}
            setCustomizeVariants={setCustomizeVariants}
            render={render}
          />
        </div>
      )}
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
                <th scope="col" class="px-6 py-3">
                  Action
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
                    <td class="px-6 py-4 flex items-center justify-center flex-wrap gap-2">
                      <button
                        onClick={() => setProduct(p)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline my-3 hover:text-orange-500"
                      >
                        <FaRegEdit size={20} />
                      </button>
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-orange-500"
                        onClick={() => handleDeleteProduct(p._id)}
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-orange-500"
                        onClick={() => setCustomizeVariants(p)}
                      >
                        <MdAddComment size={20} />
                      </button>
                    </td>
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
