import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCurrent } from "../../api/user";

export const apiGetUserCurrent = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    // Gọi lên API backend
    const response = await apiGetCurrent();
    // console.log(response);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    return response.data;
  }
);
