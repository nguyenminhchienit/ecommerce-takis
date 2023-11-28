import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "../../api/product";

export const apiGetNewProducts = createAsyncThunk(
  "product/newProduct",
  async (data, { rejectWithValue }) => {
    // Gọi lên API backend
    const response = await apiGetProducts({ sort: "-createdAt" });
    // console.log(response);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.products;
  }
);
