import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../../components/Input/InputForm";
import SelectForm from "../../components/Input/SelectForm";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import MarkdownEditor from "../../components/MarkdownEditor";
import { convertFileToBase64, validate } from "../../utils/helpers";
import { toast } from "react-toastify";
import { apiCreateProduct } from "../../api/product";
import Loading from "../../components/Loading";
import { showModal } from "../../store/app/appSlice";

const CreateProduct = () => {
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

  const { categories } = useSelector((state) => state.app);

  const [payload, setPayload] = useState({
    description: "",
  });

  const [inValidField, setInValidField] = useState([]);

  const handleChangeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await convertFileToBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    const images = [];
    console.log(files);
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
    if (watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("image").length > 0) {
      handlePreviewImages(watch("image"));
    }
  }, [watch("image")]);

  const handleAddProduct = async (data) => {
    const invalid = validate(payload, setInValidField);
    if (invalid === 0) {
      if (data.category) {
        data.category = categories.find(
          (item) => data.category === item._id
        ).title;
      }
      const finalPayload = { ...data, ...payload };
      console.log(finalPayload);
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) {
        formData.append(i[0], i[1]);
      }
      if (finalPayload.thumb) {
        formData.append("thumb", finalPayload.thumb[0]);
      }
      if (finalPayload.image) {
        for (let item of finalPayload.image) {
          formData.append("image", item);
        }
      }

      dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
      const response = await apiCreateProduct(formData);
      dispatch(showModal({ isShowModal: false, childrenModal: null }));

      if (response.success) {
        toast.success(response.mes);
        reset();
        setPayload({
          description: "",
        });
        setPreview({
          thumb: "",
          images: [],
        });
      } else {
        toast.error(response.mes);
      }
    }
  };

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex items-center justify-between text-3xl font-bold border-b pl-4 text-gray-600">
        <span>Create a product</span>
      </h1>
      <div className="p-4">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleAddProduct)}
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
              label={"Quantity"}
              register={register}
              id={"quantity"}
              fw
              style={"mt-2 flex-auto"}
              placeholder={"Quantity of new product"}
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
          <div className="flex gap-3">
            <SelectForm
              label={"Category"}
              register={register}
              id={"category"}
              fw
              style={"flex-auto"}
              errors={errors}
              options={categories?.map((item, index) => {
                return {
                  text: item.title,
                  value: item._id,
                };
              })}
            />
            <SelectForm
              label={"Brand"}
              register={register}
              id={"brand"}
              fw
              style={"flex-auto"}
              errors={errors}
              options={categories
                ?.find((cate) => cate._id === watch("category"))
                ?.brand?.map((item) => {
                  return {
                    text: item,
                    value: item,
                  };
                })}
            />
          </div>
          <MarkdownEditor
            name={"description"}
            handleChangeValue={handleChangeValue}
            inValidField={inValidField}
            setInValidField={setInValidField}
            label={"Description"}
          />
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
          <Button name={"Create new product"} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
