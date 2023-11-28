import icons from "./icons";

const { CiStar, FaStar } = icons;

export const renderStarProduct = (number) => {
  if (!Number(number)) {
    number = 0;
    //return;
  }
  const star = [];
  for (let i = 0; i < +number; i++) {
    star.push(<FaStar color="orange" />);
  }
  for (let i = 5; i > +number; i--) {
    star.push(<CiStar color="orange" />);
  }
  return star;
};
