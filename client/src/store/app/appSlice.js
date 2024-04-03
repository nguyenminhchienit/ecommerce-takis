import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoading: false,
    categories: [],
    errorMessage: "",
    isShowModal: false,
    childrenModal: null,
    isShowCart: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.childrenModal = action.payload.childrenModal;
    },
    showCart: (state) => {
      state.isShowCart = state.isShowCart === false ? true : false;
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.apiGetCategories.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.apiGetCategories.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      //console.log(action);
      state.isLoading = false;
      state.categories = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.apiGetCategories.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export const { showModal, showCart } = appSlice.actions;
export default appSlice.reducer;
