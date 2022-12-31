import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

//Register
export const register = createAsyncThunk(
  "auth/register",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formData);
      toast.success("Registration Complete");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//login
export const login = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formData);
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//update profile
export const profileUpdate = createAsyncThunk(
  "auth/updateMe",
  async ({ updateProfileData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateMe(updateProfileData);
      toast.success("Updated Profile Successfully");
      navigate("/my profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();

      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(profileUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(profileUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
