const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { createJWT, createRefreshToken } = require("../middleware/createJWT");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const cryptoJS = require("crypto");
const Product = require("../models/product");
const makeToken = require("uniqid");
const bcrypt = require("bcrypt");

const key = "nguyenminhchienit"; // tam thoi hard code do bi loi .env

const handleRegister = asyncHandler(async (req, res) => {
  const { email, password, lastName, firstName, mobile } = req.body;
  if (!email || !password || !lastName || !firstName || !mobile) {
    return res.status(400).json({
      success: false,
      mes: "Missing params",
    });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User has existed");
  } else {
    const response = await User.create(req.body);
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Register user successfully" : "Something wrong",
    });
  }
});

const handleRegisterWithAuthEMail = asyncHandler(async (req, res) => {
  const { email, password, lastName, firstName, mobile } = req.body;
  if (!email || !password || !lastName || !firstName || !mobile) {
    return res.status(400).json({
      success: false,
      mes: "Missing params",
    });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User has existed");
  } else {
    const makeTokenID = await makeToken();
    res.cookie(
      "dataRegister",
      { ...req.body, makeTokenID },
      { httpOnly: true, maxAge: 15 * 60 * 1000 }
    );
    console.log(makeTokenID);
    const html = `Xin vui lòng click vào link bên dưới để hoàn tất đăng ký link sẽ hết hạn sau 15p.
    <a href=http://localhost:8888/api/v1/user/final-create-account/${makeTokenID} >Click here</a> 
    `;

    const data = {
      email,
      html,
      subject: "Xác thực tài khoản",
    };

    const result = await sendEmail(data);
    return res.status(200).json({
      success: true,
      mes: "Please check your email to active account.",
    });
  }
});

const handleFinalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  const { email, firstName, lastName, mobile, password, makeTokenID } =
    cookie?.dataRegister;
  const { token } = req.params;
  console.log("Check token: ", token);
  if (!cookie || cookie?.dataRegister?.makeTokenID !== token) {
    res.clearCookie("dataRegister");
    return res.redirect("http://localhost:3000/final-create-account/false");
  } else {
    const user = await User.create({
      email,
      firstName,
      lastName,
      password,
      mobile,
    });
    res.clearCookie("dataRegister");
    if (user) {
      return res.redirect("http://localhost:3000/final-create-account/true");
    }
  }
  return res.redirect("http://localhost:3000/final-create-account/false");
});

//Refresh token: cap token moi
//Access token: xac thuc nguoi dung, phan quyen nguoi dung
const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing params",
    });
  }
  const user = await User.findOne({ email: email });
  if (user && (await user.checkPassword(password))) {
    const { password, role, ...userData } = user.toObject();

    const payload = {
      _id: user._id,
      role: role,
    };
    //Tao access token
    const token = createJWT(payload);

    //Tao refresh token
    const refreshToken = createRefreshToken({ _id: user._id });

    //Luu refresh token vao db
    await User.findByIdAndUpdate(
      user._id,
      { refreshToken: refreshToken },
      { new: true }
    );

    //Luu refresh token vao cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      mes: "Login successfully",
      access_token: token,
      data: userData,
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

const handleGetUserCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    return res.status(400).json({
      success: false,
      mes: "Missing params",
    });
  }
  const user = await User.findById({ _id: _id }).select(
    "-refreshToken -password"
  );
  if (user) {
    return res.status(200).json({
      success: true,
      mes: "Get user current successfully",
      data: user,
    });
  } else {
    throw new Error("User not exist");
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  //Lay token tu cookies
  const cookie = req.cookies;
  //Check xem token co ton tai o cookies hay khong
  if (!cookie || !cookie.refreshToken) {
    throw new Error("No refresh token in cookie");
  }
  //Check xem token co hop le khong
  const rs = await jwt.verify(cookie.refreshToken, key); // dung thi tra ve decode (_id) sai thi tra ve jwt expires
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  if (response) {
    const payload = {
      _id: response._id,
      role: response.role,
    };
    return res.status(200).json({
      success: response ? true : false,
      newAccessToken: response
        ? createJWT(payload)
        : "Refresh token not matched",
    });
  } else {
    throw new Error("Not found user by refresh token");
  }
});

const handleLogout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) {
    throw new Error("No refresh token in cookie");
  }
  //Tim va xoa refresh token o db
  await User.findOneAndUpdate(
    {
      refreshToken: cookie.refreshToken,
    },
    { refreshToken: "" },
    { new: true }
  );

  //Xoa token o cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    mes: "Logout success",
  });
});

const handleForgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new Error("Missing email");
  }
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    throw new Error("User not found");
  }
  const resetToken = user.createResetPasswordToken();

  await user.save();

  const html = `Xin vui lòng click vào link bên dưới để thay đổi mật khẩu link sẽ hết hạn sau 15p.
    <a href=http://localhost:3000/reset-password/${resetToken} >Click here</a> 
    `;

  const data = {
    email,
    html,
  };

  const result = await sendEmail(data);

  return res.status(200).json({
    success: true,
    result,
  });
});

const handleResetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  console.log(password, token);
  if (!password || !token) {
    throw new Error("Missing params");
  }
  const passwordResetToken = cryptoJS
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: passwordResetToken,
    passwordResetExpires: { $gt: Date.now() }, // tuc la thoi gian con song cua token la 15p
  });
  if (!user) {
    throw new Error("User not found");
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangeAt = Date.now();
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Change password successfully" : "Can't change password",
  });
});

const handleGetAllUser = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  //Tach cac truong dat biet ra khoi query
  const excludeFields = ["limit", "page", "fields", "sort"];
  excludeFields.forEach((el) => delete queries[el]);

  //Fortmat lai cho dung cu phap cua mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatQuery = JSON.parse(queryString);

  //Filtering
  if (queries?.name) {
    formatQuery.name = { $regex: queries.name, $options: "i" };
  }

  if (req.query.q) {
    delete formatQuery.q;
    formatQuery["$or"] = [
      { firstName: { $regex: req.query.q, $options: "i" } },
      { lastName: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }

  let queryCommand = User.find(formatQuery);

  //Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  //Limit fields
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  //Pagination
  const page = +req.query.page * 1 || 1; // so count truyen vao
  const limit = +req.query.limit * 1 || 10; //(tham so limit);
  const skip = (page - 1) * limit;

  queryCommand = queryCommand.skip(skip).limit(limit);

  queryCommand
    .then(async (users) => {
      const counts = await User.find(formatQuery).countDocuments();
      return res.status(200).json({
        success: users ? true : false,
        users: users ? users : "Get all users failed",
        counts,
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

const handleDeleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) {
    throw new Error("Missing params");
  }
  const user = await User.findByIdAndDelete({ _id: _id });
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? `User with email ${user.email} deleted` : "User not found",
  });
});

const handleUpdateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0) {
    throw new Error("Missing input");
  }
  const user = await User.findByIdAndUpdate(
    {
      _id: _id,
    },
    req.body,
    { new: true }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: user ? true : false,
    data: user ? user : "Something wrong",
  });
});

const handleUpdateUserByAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id || Object.keys(req.body).length === 0) {
    throw new Error("Missing input");
  }
  const user = await User.findByIdAndUpdate(
    {
      _id: _id,
    },
    req.body,
    { new: true }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: user ? true : false,
    data: user ? user : "Something wrong",
  });
});

const handleUpdateAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) {
    throw new Error("Missing input");
  }
  const user = await User.findByIdAndUpdate(
    {
      _id: _id,
    },
    { $push: { address: req.body.address } },
    { new: true }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: user ? true : false,
    data: user ? user : "Something wrong",
  });
});

const handleUpdateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) {
    throw new Error("Missing input");
  }
  const userCart = await User.findById(_id);
  console.log("Check user in product cart: ", userCart);
  const alreadyProduct = userCart?.cart?.find(
    (el) => el.product.toString() === pid
  );
  if (alreadyProduct) {
    if (alreadyProduct.color == color) {
      const response = await User.updateOne(
        { cart: { $elemMatch: alreadyProduct } },
        { $set: { "cart.$.quantity": +alreadyProduct.quantity + +quantity } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Something wrong",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        {
          _id: _id,
        },
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      ).select("-password -role -refreshToken");
      return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Something wrong",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      {
        _id: _id,
      },
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    ).select("-password -role -refreshToken");
    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "Something wrong",
    });
  }
});

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleGetUserCurrent,
  handleRefreshToken,
  handleForgotPassword,
  handleResetPassword,
  handleGetAllUser,
  handleDeleteUser,
  handleUpdateUser,
  handleUpdateUserByAdmin,
  handleUpdateAddress,
  handleUpdateCart,
  handleRegisterWithAuthEMail,
  handleFinalRegister,
};
