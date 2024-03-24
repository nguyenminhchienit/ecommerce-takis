import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import InputForm from "../../components/Input/InputForm";
import { convertFileToBase64 } from "../../utils/helpers";
import Button from "../../components/Button";
import { showModal } from "../../store/app/appSlice";
import { apiAddVariants } from "../../api/product";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddVariants = ({ render, customizeVariants, setCustomizeVariants }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const dispatch = useDispatch();

  const [preview, setPreview] = useState({
    thumb: "",
    images: [],
  });

  useEffect(() => {
    reset({
      title: customizeVariants?.title,
      price: customizeVariants?.price,
      color: customizeVariants?.color,
    });
  }, []);

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await convertFileToBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    const images = [];
    for (let file of files) {
      // if (file.type !== "image/png" && file.type !== "image/jpg") {
      //   toast.warning("File not supported");
      //   return;
      // }
      const base64 = await convertFileToBase64(file);
      images.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: images }));
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb")?.length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("image") instanceof FileList && watch("image").length > 0) {
      handlePreviewImages(watch("image"));
    }
  }, [watch("image")]);

  const handleBack = () => {
    setCustomizeVariants(null);
  };

  const handelAddVariants = async (data) => {
    if (data.color !== customizeVariants.color) {
      const formData = new FormData();
      for (let i of Object.entries(data)) {
        formData.append(i[0], i[1]);
      }
      if (data.thumb) {
        formData.append("thumb", data.thumb[0]);
      }
      if (data.image) {
        for (let item of data.image) {
          formData.append("image", item);
        }
      }

      dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
      const response = await apiAddVariants(formData, customizeVariants._id);
      dispatch(showModal({ isShowModal: false, childrenModal: null }));

      console.log("res: ", response);

      if (response.success) {
        toast.success(response.mes);
        render();
        setCustomizeVariants(null);
      } else {
        toast.error(response.mes);
      }
    } else {
      Swal.fire({
        title: "Oops",
        text: "Color not change",
        icon: "info",
      });
    }
  };

  return (
    <div>
      <div className="h-[75px]"></div>
      <h1 className="h-[75px] w-full flex items-center font-bold text-3xl px-4 fixed top-0 border-b bg-gray-200">
        <div>
          <span>Customize Variants Product</span>
        </div>
      </h1>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(handelAddVariants)}
          className="flex flex-col gap-3"
        >
          <InputForm
            label={"Name product"}
            register={register}
            id={"title"}
            fw
            placeholder={"Name of new product"}
            errors={errors}
            validate={{ required: "Require" }}
          />
          <div className="flex gap-3">
            <InputForm
              label={"Price"}
              register={register}
              id={"price"}
              fw
              style={"mt-2 flex-auto"}
              placeholder={"Price of new product"}
              errors={errors}
              validate={{ required: "Require" }}
            />

            <InputForm
              label={"Color"}
              register={register}
              id={"color"}
              fw
              style={"mt-2 flex-auto"}
              placeholder={"Color of new product"}
              errors={errors}
              validate={{ required: "Require" }}
            />
          </div>
          <div className="flex gap-1 flex-col">
            <label htmlFor="thumb">Upload thumb</label>
            <input
              type="file"
              accept="image/*"
              id="thumb"
              {...register("thumb", { required: "Require" })}
            />
            {errors["thumb"] && (
              <small className="text-red-500 pt-1">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div>
              <img
                src={preview.thumb}
                alt="thumb"
                className="my-4 w-[100px] object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="thumb">Upload images products</label>
            <input
              type="file"
              accept="image/*"
              id="image"
              {...register("image", { required: "Require" })}
              multiple
            />
            {errors["image"] && (
              <small className="text-red-500 pt-1">
                {errors["image"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {preview.images.map((item, index) => {
                return (
                  <img
                    key={index}
                    src={item}
                    alt="images"
                    className="my-4 w-[100px] object-cover"
                  />
                );
              })}
            </div>
          )}
          <div className="flex gap-3">
            <Button name={"Back"} color={"back"} handleOnClick={handleBack} />
            <Button name={"Add variants"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVariants;
