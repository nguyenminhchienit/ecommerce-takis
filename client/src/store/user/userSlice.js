import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: "",
    isLoading: false,
    message: "",
  },
  reducers: {
    register: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = "";
      state.current = null;
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.apiGetUserCurrent.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.apiGetUserCurrent.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      // console.log(action);
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn = true;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.apiGetUserCurrent.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
      state.message = "Phiên đăng nhập đã hết hạn";
    });
  },
});

export const { register, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
