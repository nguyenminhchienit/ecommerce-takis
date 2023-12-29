import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "../../components";
import { apiGetProducts } from "../../api/product";
import FilterItem from "../../components/FilterItem";
import Masonry from "react-masonry-css";
import Product from "../../components/Product";
import { useParams } from "react-router-dom";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const ProductCategory = () => {
  const [products, setProducts] = useState([]);
  const [activeClick, setActiveClick] = useState(null);
  const { category } = useParams();

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response?.success) {
      setProducts(response.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChangeClick = (name) => {
    if (name === activeClick) {
      setActiveClick(null);
    } else {
      setActiveClick(name);
    }
  };

  return (
    <div>
      <div className="w-full mt-3 bg-gray-100 h-[70px] flex justify-center flex-col">
        <div className="ml-2">
          <Breadcrumbs />
        </div>
      </div>
      <div className="border flex py-2 px-4 mt-4 justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-600 text-sm capitalize">
            Filter by
          </span>
          <div className="flex gap-2">
            <FilterItem
              name={"price"}
              handleChangeClick={handleChangeClick}
              activeClick={activeClick}
            />
            <FilterItem
              name={"color"}
              handleChangeClick={handleChangeClick}
              activeClick={activeClick}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-600 text-sm capitalize">
            sort by
          </span>
          <div className="flex gap-2">
            <FilterItem
              name={"best selling"}
              xl
              handleChangeClick={handleChangeClick}
              activeClick={activeClick}
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex gap-4"
          columnClassName="my-masonry-grid_column flex flex-col gap-4"
        >
          {products?.map((item) => {
            return <Product key={item._id} data={item} />;
          })}
        </Masonry>
      </div>
    </div>
  );
};

export default ProductCategory;
