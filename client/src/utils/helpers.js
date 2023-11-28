import icons from "./icons";

const { CiStar, FaStar } = icons;

export const renderStarProduct = (number, size) => {
  if (!Number(number)) {
    number = 0;
    //return;
  }
  const star = [];
  for (let i = 0; i < +number; i++) {
    star.push(<FaStar color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    star.push(<CiStar color="orange" size={size || 16} />);
  }
  return star;
};
