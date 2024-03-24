import path from "./path";
import icons from "../utils/icons";

export const navigation = [
  {
    id: 1,
    value: "Home",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "Products",
    path: `/${path.PRODUCT}`,
  },
  {
    id: 3,
    value: "Blogs",
    path: `/${path.BLOG}`,
  },
  {
    id: 4,
    value: "Our services",
    path: `/${path.OUR_SERVICE}`,
  },
  {
    id: 5,
    value: "FAQs",
    path: `/${path.FAQs}`,
  },
];

export const color = [
  "Green",
  "Brown",
  "Red",
  "Black",
  "Pink",
  "Blue",
  "White",
];

export const sorts = [
  {
    id: 1,
    value: "-price",
    text: "Price - high to low",
  },
  {
    id: 2,
    value: "price",
    text: "Price - low to high",
  },
];

export const voteOption = [
  {
    id: 1,
    text: "Terrible",
  },
  {
    id: 2,
    text: "Bad",
  },
  {
    id: 3,
    text: "Neutral",
  },
  {
    id: 4,
    text: "Good",
  },
  {
    id: 5,
    text: "Perfect",
  },
];

const {
  RxDashboard,
  MdManageAccounts,
  MdOutlineProductionQuantityLimits,
  FaMoneyBills,
} = icons;
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <RxDashboard size={24} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Manage User",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdManageAccounts size={24} />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Manage Product",
    icon: <MdOutlineProductionQuantityLimits size={24} />,
    submenu: [
      {
        text: "Create Product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
      {
        text: "Manage Product",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Manage Order",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <FaMoneyBills size={24} />,
  },
];

export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <RxDashboard size={24} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "My cart",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <MdManageAccounts size={24} />,
  },

  {
    id: 3,
    type: "SINGLE",
    text: "Buy history",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <FaMoneyBills size={24} />,
  },

  {
    id: 4,
    type: "SINGLE",
    text: "Wishlist",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <FaMoneyBills size={24} />,
  },
];
