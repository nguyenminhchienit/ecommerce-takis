import React, { useCallback, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import InforProduct from "./InforProduct";
import Review from "./Reviews/Review";
import Ratings from "./Reviews/Ratings";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/app/appSlice";
import ModalVote from "./Modal/ModalVote";
import { apiRatings } from "../api/product";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "../utils/path";
import Comment from "./Comment/Comment";

function DescriptionProduct({ product, rerender }) {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { pid } = useParams();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleToggleVote = () => {
    if (isLoggedIn) {
      dispatch(
        showModal({
          isShowModal: true,
          childrenModal: (
            <ModalVote
              nameProduct={product?.title}
              handleSubmitRatings={handleSubmitRatings}
            />
          ),
        })
      );
    } else {
      Swal.fire({
        text: "Login to ratings",
        confirmButtonText: "Go login",
        showCancelButton: true,
        title: "Bạn chưa đăng nhập",
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    }
  };

  const handleSubmitRatings = useCallback(async ({ star, comment }) => {
    console.log({ star, comment, pid });
    if (!star || !comment || !pid) {
      alert("Please vote when click");
      return;
    }
    const response = await apiRatings({
      star,
      comment,
      pid,
      updatedAt: Date.now(),
    });
    if (response.success) {
      dispatch(
        showModal({
          isShowModal: false,
          childrenModal: null,
        })
      );
      rerender();
    }
  }, []);

  return (
    <div className="">
      <div className="mt-4 flex gap-1">
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => {
            setTabIndex(index);
          }}
        >
          <TabList className={"flex gap-1 cursor-pointer"}>
            <Tab className={"uppercase border p-2 bg-gray-200 rounded-s"}>
              Description
            </Tab>
            <Tab className={"uppercase border p-2 bg-gray-200 rounded-s"}>
              Warranty
            </Tab>
            <Tab className={"uppercase border p-2 bg-gray-200 rounded-s"}>
              Delivery
            </Tab>
            <Tab className={"uppercase border p-2 bg-gray-200 rounded-s"}>
              Payment
            </Tab>
            <Tab className={"uppercase border p-2 bg-gray-200 rounded-s"}>
              Customer reviews
            </Tab>
          </TabList>

          <TabPanel>
            <ul className="flex flex-col ml-4 mt-2 list-square">
              {product?.description?.map((item, index) => {
                return (
                  <li key={index} className="text-[16px] text-gray-500">
                    {item}
                  </li>
                );
              })}
            </ul>
          </TabPanel>
          <TabPanel>
            <p className="mt-2 text-gray-500 text-sm">
              <b>WARRANTY INFORMATION</b>
              <br />
              LIMITED WARRANTIES <br />
              Limited Warranties are non-transferable. The following Limited
              Warranties are given to the original retail purchaser of the
              following Ashley Furniture Industries, Inc.Products: Frames Used
              In Upholstered and Leather Products Limited Lifetime Warranty A
              Limited Lifetime Warranty applies to all frames used in sofas,
              couches, love seats, upholstered chairs, ottomans, sectionals, and
              sleepers. Ashley Furniture Industries,Inc. warrants these
              components to you, the original retail purchaser, to be free from
              material manufacturing defects.
            </p>
          </TabPanel>
          <TabPanel>
            <p className="mt-2 text-gray-500 text-sm">
              <b>PURCHASING & DELIVERY</b>
              <br />
              Before you make your purchase, it’s helpful to know the
              measurements of the area you plan to place the furniture. You
              should also measure any doorways and hallways through which the
              furniture will pass to get to its final destination. Picking up at
              the store Shopify Shop requires that all products are properly
              inspected BEFORE you take it home to insure there are no
              surprises. Our team is happy to open all packages and will assist
              in the inspection process. We will then reseal packages for safe
              transport. We encourage all customers to bring furniture pads or
              blankets to protect the items during transport as well as rope or
              tie downs. Shopify Shop will not be responsible for damage that
              occurs after leaving the store or during transit. It is the
              purchaser’s responsibility to make sure the correct items are
              picked up and in good condition. Delivery Customers are able to
              pick the next available delivery day that best fits their
              schedule. However, to route stops as efficiently as possible,
              Shopify Shop will provide the time frame. Customers will not be
              able to choose a time. You will be notified in advance of your
              scheduled time frame. Please make sure that a responsible adult
              (18 years or older) will be home at that time. In preparation for
              your delivery, please remove existing furniture, pictures,
              mirrors, accessories, etc. to prevent damages. Also insure that
              the area where you would like your furniture placed is clear of
              any old furniture and any other items that may obstruct the
              passageway of the delivery team. Shopify Shop will deliver,
              assemble, and set-up your new furniture purchase and remove all
              packing materials from your home. Our delivery crews are not
              permitted to move your existing furniture or other household
              items. Delivery personnel will attempt to deliver the purchased
              items in a safe and controlled manner but will not attempt to
              place furniture if they feel it will result in damage to the
              product or your home. Delivery personnel are unable to remove
              doors, hoist furniture or carry furniture up more than 3 flights
              of stairs. An elevator must be available for deliveries to the 4th
              floor and above.
            </p>
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel>
            <p className="mt-2 text-gray-500 text-sm">
              <b>REVIEWS INFORMATION</b>
              <br /> <br />
              <Review
                totalRating={product?.totalRating}
                ratings={product?.rating}
                totalCountRating={18}
              />
              <Ratings
                handleToggleVote={handleToggleVote}
                ratings={product?.rating}
              />
            </p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default DescriptionProduct;
