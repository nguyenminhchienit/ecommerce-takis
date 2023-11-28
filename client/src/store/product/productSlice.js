import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    newProducts: [],
    errorMessage: "",
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.apiGetNewProducts.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.apiGetNewProducts.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      //console.log(action);
      state.isLoading = false;
      state.newProducts = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.apiGetNewProducts.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

// export const {} = appSlice.actions;
export default productSlice.reducer;
