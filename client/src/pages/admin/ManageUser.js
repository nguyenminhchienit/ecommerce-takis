import React, { useEffect, useState } from "react";
import { apiDeleteUser, apiGetUsers } from "../../api/user";
import moment from "moment";
import InputField from "../../components/InputField";
import Pagination from "../../components/Pagination/Pagination";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { showModal } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";
import ModalEdit from "../../components/Modal/ModalEdit";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [params] = useSearchParams();
  const dispatch = useDispatch();

  const debounce = useDebounce(queries.q, 800);

  const fetchAllUsers = async (params) => {
    const response = await apiGetUsers({ ...params, limit: 2 });
    if (response?.success) {
      setUsers(response);
    }
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (debounce) {
      queries.q = debounce;
    }
    fetchAllUsers(queries);
  }, [debounce, params, update]);

  const setValue = (value) => {
    setQueries(value);
  };

  const handleSetUpdate = () => {
    setUpdate(!update);
  };

  const handleEditUser = (user) => {
    dispatch(
      showModal({
        isShowModal: true,
        childrenModal: (
          <ModalEdit user={user} handleSetUpdate={handleSetUpdate} />
        ),
      })
    );
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "You are sure.....",
      text: `You want delete ${user?.email}`,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(user?._id);
        if (response.success) {
          toast.success(response.mes);
        } else {
          toast.error(response.mes);
        }
      }
    });
  };

  return (
    <div>
      <h1 className="h-[75px] flex justify-center items-center font-bold text-3xl px-4">
        <span>Manage User</span>
      </h1>
      <div>
        <div className="flex text-right mr-3">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setValue}
            placeholder="Search email or name ..."
            styleCustom="w500"
          />
        </div>
        <div class="overflow-x-auto shadow-md ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  #
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  FullName
                </th>
                <th scope="col" class="px-6 py-3">
                  Role
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((user, index) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {`${user.lastName} ${user.firstName}`}
                    </th>
                    <td class="px-6 py-4 capitalize">{user.role}</td>
                    <td class="px-6 py-4">
                      {user.isBlocked ? "Blocked" : "Active"}
                    </td>

                    <td class="px-6 py-4 text-right flex gap-3">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleDeleteUser(user)}
                      >
                        Delete
                      </button>
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        View
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
        <Pagination totalCount={users?.counts} />
      </div>
    </div>
  );
};

export default ManageUser;
