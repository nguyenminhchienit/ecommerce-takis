import icons from "./icons";

const { CiStar, FaStar } = icons;

export const renderStarProduct = (number, size) => {
  if (!Number(number)) {
    number = 0;
    //return;
  }
  const star = [];
  number = Math.round(number);
  for (let i = 0; i < +number; i++) {
    star.push(<FaStar color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    star.push(<CiStar color="orange" size={size || 16} />);
  }
  return star;
};

export const validate = (payload, setInValidField) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInValidField((prev) => [
        ...prev,
        {
          name: arr[0],
          mes: `${
            arr[0].charAt(0).toUpperCase() + arr[0].slice(1)
          } is required!`,
        },
      ]);
    }
  }

  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email": {
        const regex =
          "^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$";
        if (!arr[1].match(regex)) {
          invalids++;
          setInValidField((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: `Email invalid!`,
            },
          ]);
        }
        break;
      }
      case "": {
        const phoneNumberRegex = /^(0[35789]|84[35789])(d{8}|d{9})$/;
        if (!phoneNumberRegex.test(arr[1])) {
          invalids++;
          setInValidField((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: `Phone invalid!`,
            },
          ]);
        }
        break;
      }
      case "password": {
        if (arr[1].length < 6) {
          invalids++;
          setInValidField((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: `Password must be more than 6 characters`,
            },
          ]);
        }
        break;
      }
      default:
        break;
    }
  }
  return invalids;
};

export const generateRange = (star, end) => {
  const length = end - star + 1;
  return Array.from({ length }, (_, index) => star + index);
};

export const convertFileToBase64 = (file) => {
  if (!file) {
    return "";
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};
