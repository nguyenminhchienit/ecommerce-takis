import React, { useState, useEffect } from "react";
import { apiGetCategory } from "../api/app";

const Sidebar = () => {
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    const response = await apiGetCategory();
    if (response && response.success) {
      setCategory(response.productCategories);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  console.log("Check category: ", category);
  return <div>Sidebar</div>;
};

export default Sidebar;
