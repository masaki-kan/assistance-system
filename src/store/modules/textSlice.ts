import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  value: number;
}

const initialState: initialStateType = {
  value: 0, // 初期値を設定
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
});

export default testSlice;
