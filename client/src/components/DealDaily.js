import React, { useEffect, useState } from "react";
import icons from "../utils/icons";
import { apiGetProducts } from "../api/product";
import { renderStarProduct } from "../utils/helpers";
import formatPrice from "../utils/formatPrice";
import CountDown from "./CountDown";

const { FaStar, MdMenuBook } = icons;

let idInterval = "";
const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState({});
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expiresTime, setExpiresTime] = useState(false);

  const fetchProduct = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 5),
      totalRating: 5,
    });
    if (response.success) {
      const h = 24 - new Date().getHours();
      const m = 59 - new Date().getMinutes();
      const s = 59 - new Date().getSeconds();
      setDealDaily(response.products[0]);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    } else {
      setHours(0);
      setMinutes(59);
      setSeconds(59);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchProduct();
  }, [expiresTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(60);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(60);
            setSeconds(60);
          } else {
            setExpiresTime(!expiresTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [seconds, minutes, hours, expiresTime]);

  return (
    <div className="w-full border flex-auto p-2">
      <h3 className="flex justify-between items-center">
        <span className="flex-4">
          <FaStar color="red" />
        </span>
        <span className="uppercase font-bold flex-3 text-center text-gray-700">
          Deal Daily
        </span>
        <span className="flex-4"></span>
      </h3>
      <div>
        <img
          src={
            dealDaily?.thumb ||
            "https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg"
          }
          alt="thumb-nail"
          className="w-[243px] h-[243px] object-cover"
        />

        <div className="p-4 flex flex-col text-base text-center justify-center">
          <span className="uppercase">{dealDaily?.title}</span>
          <span className="flex py-2 justify-center">
            {renderStarProduct(dealDaily?.totalRating)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
          <span>{formatPrice(dealDaily?.price)}</span>
        </div>

        <div className="flex gap-2 justify-center mb-4">
          <CountDown number={hours} unit={"Hours"} />
          <CountDown number={minutes} unit={"Minutes"} />
          <CountDown number={seconds} unit={"Seconds"} />
        </div>

        <div
          type="button"
          className="flex cursor-pointer justify-center items-center gap-4 bg-main text-white rounded-md p-2 hover:bg-white border border-main hover:border-main hover:text-main"
        >
          <MdMenuBook />
          <span className="font-semibold">OPTIONS</span>
        </div>
      </div>
    </div>
  );
};

export default DealDaily;
