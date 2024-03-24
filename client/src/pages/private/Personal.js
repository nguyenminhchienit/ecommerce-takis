import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import InputForm from "../../components/Input/InputForm";
import { useSelector } from "react-redux";
import moment from "moment";
import { convertFileToBase64 } from "../../utils/helpers";

const Personal = () => {
  const { current } = useSelector((state) => state.user);
  const [preview, setPreview] = useState({
    avatar: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    reset({
      firstName: current?.firstName,
      lastName: current?.lastName,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
    });
  }, [current]);

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await convertFileToBase64(file);
    setPreview((prev) => ({ ...prev, avatar: base64Thumb }));
  };

  useEffect(() => {
    if (watch("avatar")?.length > 0) {
      handlePreviewThumb(watch("avatar")[0]);
    }
  }, [watch("avatar")]);

  const handleUpdatePersonal = async (data) => {
    console.log("Data: ", data);
  };
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex items-center justify-between text-3xl font-bold border-b border-gray-500 pl-4 text-gray-600">
        <span>Personal</span>
      </h1>
      <div>
        <form
          className="w-3/5 mx-auto flex flex-col gap-3"
          onSubmit={handleSubmit(handleUpdatePersonal)}
        >
          <InputForm
            label={"First name"}
            register={register}
            id={"firstName"}
            fw
            placeholder={"First name"}
            errors={errors}
            validate={{ required: "Require" }}
          />
          <InputForm
            label={"Last Name"}
            register={register}
            id={"lastName"}
            fw
            style={"mt-2 flex-auto"}
            placeholder={"Last Name"}
            errors={errors}
            validate={{ required: "Require" }}
          />
          <InputForm
            label={"Email"}
            register={register}
            id={"email"}
            fw
            style={"mt-2 flex-auto"}
            placeholder={"Email"}
            errors={errors}
            validate={{ required: "Require" }}
          />
          <InputForm
            label={"Phone"}
            register={register}
            id={"mobile"}
            fw
            style={"mt-2 flex-auto"}
            placeholder={"Phone"}
            errors={errors}
            validate={{ required: "Require" }}
          />

          <div className="flex gap-1 flex-col">
            <label htmlFor="avatar">Upload thumb</label>
            <input
              type="file"
              accept="image/*"
              id="avatar"
              {...register("avatar", { required: "Require" })}
            />
            {errors["avatar"] && (
              <small className="text-red-500 pt-1">
                {errors["avatar"]?.message}
              </small>
            )}
          </div>
          {preview.avatar && (
            <div>
              <img
                src={preview.avatar}
                alt="avatar"
                className="my-4 w-[100px] h-[100px] object-cover rounded-full border border-main"
              />
            </div>
          )}

          <Button name={"Update information"} type="submit" />

          <div className="flex gap-3">
            <span>Role: </span>
            <span>{current?.role === "admin" ? "Admin" : "User"}</span>
          </div>

          <div className="flex gap-3">
            <span>Status: </span>
            <span>{current?.isBlocked ? "Blocked" : "Active"}</span>
          </div>

          <div className="flex gap-3">
            <span>CreateAt: </span>
            <span>{moment(current?.createdAt).fromNow()}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Personal;
