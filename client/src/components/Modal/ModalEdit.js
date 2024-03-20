import React from "react";
import { useForm } from "react-hook-form";
import InputForm from "../Input/InputForm";
import Button from "../Button";
import { showModal } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { apiUpdateUser } from "../../api/user";
import { toast } from "react-toastify";
import SelectForm from "../Input/SelectForm";

const ModalEdit = ({ user, handleSetUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    firstName: "",
    lastName: "",
    role: "",
    mobile: "",
    isBlocked: "",
  });

  const dispatch = useDispatch();

  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, user._id);
    if (response.success) {
      toast.success(response.mes);
      dispatch(
        showModal({
          isShowModal: false,
          childrenModal: null,
        })
      );
      handleSetUpdate();
    } else {
      toast.error(response.mes);
    }
  };

  const handleBack = () => {
    dispatch(
      showModal({
        isShowModal: false,
        childrenModal: null,
      })
    );
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-6 rounded-md shadow-sm flex flex-col gap-4 items-center justify-center box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
    >
      <img src={logo} alt="logo" />
      <h2 className="text-center text-medium">Updating {user.email}</h2>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-3">
          <InputForm
            register={register}
            id={"firstName"}
            errors={errors}
            defaultValue={user?.firstName}
            validate={{ required: "Require" }}
          />
          <InputForm
            register={register}
            id={"lastName"}
            errors={errors}
            defaultValue={user?.lastName}
            validate={{ required: "Require" }}
          />
        </div>
        {/* <InputForm
          register={register}
          id={"Email"}
          errors={errors}
          disabled={true}
          defaultValue={user?.email}
          fw
        /> */}
        <InputForm
          register={register}
          id={"mobile"}
          errors={errors}
          defaultValue={user?.mobile}
          validate={{ required: "Require" }}
          fw
        />
        <div className="flex gap-3">
          <SelectForm
            register={register}
            id={"role"}
            fw
            errors={errors}
            defaultValue={user?.role}
            options={[
              {
                text: "Admin",
                value: "admin",
              },
              {
                text: "Customer",
                value: "customer",
              },
            ]}
          />
          <SelectForm
            register={register}
            id={"isBlocked"}
            errors={errors}
            fw
            defaultValue={user?.isBlocked}
            options={[
              {
                text: "Blocked",
                value: "true",
              },
              {
                text: "Active",
                value: "false",
              },
            ]}
          />
        </div>
        <div className="flex gap-3">
          <Button name={"Update"} type="submit" />
          <button
            className="px-4 py-2 my-2 rounded-md text-white bg-yellow-400 w-full font-semibold"
            onClick={() => handleBack()}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEdit;
