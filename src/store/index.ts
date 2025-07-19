import { combineReducers } from "@reduxjs/toolkit";
import testSlice from "./modules/textSlice";

const rootReducer = combineReducers({
  test: testSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
