import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs, SliderProduct } from "../../components";
import { apiGetProduct, apiGetProducts } from "../../api/product";
import Slider from "react-slick";
import InforProduct from "../../components/InforProduct";
import CardInfo from "../../components/CardInfo";
import icons from "../../utils/icons";
import DescriptionProduct from "../../components/DescriptionProduct";

const { FaShieldAlt, BsCarFrontFill, FaGift, GiReturnArrow, MdLocalPhone } =
  icons;
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
};

const DetailProduct = () => {
  const { pid, title, category } = useParams();

  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState("");
  const fetchProduct = async () => {
    const response = await apiGetProduct(pid);
    if (response?.success) {
      setProduct(response?.product);
    }
  };

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response?.success) {
      setProducts(response?.products);
    }
  };

  const handleClickImage = (src) => {
    if (src) {
      setImage(src);
    }
  };

  useEffect(() => {
    if (pid) {
      fetchProduct();
      fetchProducts();
    }
  }, [pid]);
  return (
    <>
      <div className="w-full bg-gray-100 h-[70px] flex justify-center flex-col mt-3">
        <div className="ml-2">
          <div>{title}</div>
          <Breadcrumbs title={title} category={category} />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-2/5 flex-col items-center">
          <img
            src={image || product?.thumb}
            alt="product"
            className="w-[400px] h-[420px] object-cover border"
          />
          <div className="mt-4">
            <Slider className="image-slider" {...settings}>
              {product?.images?.map((item) => {
                return (
                  <div>
                    <img
                      src={item}
                      alt="item"
                      className="w-[120px] h-[120px] object-cover border p-2"
                      onClick={() => handleClickImage(item)}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 ml-4">
          <InforProduct product={product} />
        </div>
        <div className="w-1/5 flex flex-col gap-2">
          <CardInfo
            icon={<FaShieldAlt color="gray" size={30} />}
            title={"Guarantee"}
            description={"Quality Checked"}
          />

          <CardInfo
            icon={<BsCarFrontFill color="gray" size={30} />}
            title={"Free Shipping"}
            description={"Free On All Products"}
          />

          <CardInfo
            icon={<FaGift color="gray" size={30} />}
            title={"Special Gift Cards"}
            description={"Special Gift Cards"}
          />

          <CardInfo
            icon={<GiReturnArrow color="gray" size={30} />}
            title={"Free Return"}
            description={"Within 7 Days"}
          />

          <CardInfo
            icon={<MdLocalPhone color="gray" size={30} />}
            title={"Consultancy"}
            description={"Lifetime 24/7/356"}
          />
        </div>
      </div>

      <div>
        <DescriptionProduct product={product} />
      </div>

      <div className="mt-8">
        <div className="uppercase font-semibold text-[20px] border-main border-b-2 mb-4">
          OTHER CUSTOMERS ALSO BUY
        </div>
        <SliderProduct products={products} />
      </div>
    </>
  );
};

export default DetailProduct;
