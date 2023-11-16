const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");

const handleCreateOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body; // id cua coupon
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");

  const products = userCart?.cart?.map((el) => {
    return {
      product: el.product._id,
      count: el.quantity,
      color: el.color,
    };
  });

  let total = userCart?.cart?.reduce((sum, cur) => {
    return cur.product.price * cur.quantity + sum;
  }, 0);

  const data = {
    products,
    total,
    orderBy: _id,
  };

  if (coupon) {
    const selectedCoupon = await Coupon.findById(coupon);
    total = Math.round(total * (1 - +selectedCoupon?.discount / 100)) || total;

    data.total = total;
    data.coupon = coupon;
  }

  const response = await Order.create(data);

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? response : "Somethings wrong",
    cart: userCart,
  });
});

const handleUpdateStatusOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) {
    throw new Error("Missing status");
  }
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? response : "Somethings wrong",
  });
});

const handleGetOrderByUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });
  return res.status(200).json({
    success: response ? true : false,
    order: response ? response : "Somethings wrong",
  });
});

const handleGetOrderByAdmin = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.status(200).json({
    success: response ? true : false,
    orders: response ? response : "Somethings wrong",
  });
});

module.exports = {
  handleCreateOrder,
  handleUpdateStatusOrder,
  handleGetOrderByUser,
  handleGetOrderByAdmin,
};
