import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumbs } from "../../components";
import { apiGetProducts } from "../../api/product";
import FilterItem from "../../components/FilterItem";
import Masonry from "react-masonry-css";
import Product from "../../components/Product";
import {
  useSearchParams,
  useNavigate,
  useParams,
  createSearchParams,
} from "react-router-dom";
import InputSelect from "../../components/InputSelect";
import { sorts } from "../../utils/constants";
import Pagination from "../../components/Pagination/Pagination";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();

  const fetchProducts = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response?.success) {
      setProducts(response);
    }
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) {
      param.push(i);
    }

    const queries = {};
    for (let i of params) {
      queries[i[0]] = i[1];
    }

    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
      delete queries.from;
      delete queries.to;
    }
    const q = { ...priceQuery, ...queries };
    fetchProducts(q);
    window.scrollTo(0, 0);
  }, [params]);

  const handleChangeClick = (name) => {
    if (name === activeClick) {
      setActiveClick(null);
    } else {
      setActiveClick(name);
    }
  };

  const handleChangeSelect = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    navigate({
      pathname: category !== undefined ? `/products/${category}` : `/products`,
      search:
        sort !== "" &&
        createSearchParams({
          sort: sort,
        }).toString(),
    });
  }, [sort]);

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
              type={"input"}
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
            <InputSelect
              value={sort}
              options={sorts}
              changeValue={handleChangeSelect}
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
          {products?.products?.map((item) => {
            return <Product key={item._id} data={item} />;
          })}
        </Masonry>
      </div>
      <div>
        <Pagination totalCount={products?.counts} />
      </div>
    </div>
  );
};

export default Products;
