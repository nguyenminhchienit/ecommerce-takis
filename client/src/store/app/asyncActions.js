import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategory } from "../../api/app";

export const apiGetCategories = createAsyncThunk(
  "app/getCategories",
  async (data, { rejectWithValue }) => {
    // Gọi lên API backend
    const response = await apiGetCategory();
    // console.log(response);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    return response.productCategories;
  }
);
