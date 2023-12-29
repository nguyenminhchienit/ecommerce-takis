import path from "./path";

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
