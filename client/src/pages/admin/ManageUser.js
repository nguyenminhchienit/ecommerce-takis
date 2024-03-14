import React, { useEffect, useState } from "react";
import { apiGetUsers } from "../../api/user";
import moment from "moment";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async (params) => {
    const response = await apiGetUsers();
    if (response?.success) {
      setUsers(response?.users);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1 className="h-[75px] flex justify-center items-center font-bold text-3xl px-4">
        <span>Manage User</span>
      </h1>
      <div>
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
              {users?.map((user, index) => {
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
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
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
    </div>
  );
};

export default ManageUser;
