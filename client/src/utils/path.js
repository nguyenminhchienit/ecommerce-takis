const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCT: "products",
  PRODUCT__CATEGORY: "products/:category",
  BLOG: "blogs",
  OUR_SERVICE: "our-services",
  FAQs: "FAQs",
  DETAIL_PRODUCT: "products",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: "products/:category/:pid/:title",
  REDIRECT_REGISTER: "final-create-account/:status",
  RESET_PASSWORD: "reset-password/:token",

  // ADMIN
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_ORDER: "manage-order",
  MANAGE_PRODUCT: "manage-product",
  CREATE_PRODUCT: "create-product",

  //MEMBER
  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  WISHLIST: "wishlist",
  HISTORY: "buy-history",
};

export default path;
