const price = (x) => {
  return x?.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export default price;
