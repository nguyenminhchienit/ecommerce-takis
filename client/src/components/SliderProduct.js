import React from "react";
import Slider from "react-slick";
import Product from "./Product";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
};
const SliderProduct = ({ products }) => {
  return (
    <div className="w-full">
      {products && (
        <Slider {...settings}>
          {products?.map((item) => {
            return <Product key={item._id} data={item} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export default SliderProduct;
