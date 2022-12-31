import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./features/authSlice";
import BlogSlice from './features/blogSlice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    blog:BlogSlice
  },
});
