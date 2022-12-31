import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

//create Tour
export const addBlog = createAsyncThunk(
  "/addblog",
  async ({ blogData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addBlog(blogData);
      toast.success("Blog Added Succefully");
      navigate("/my profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// All Blogs
export const allBlogs = createAsyncThunk(
  "/allBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllBlogs();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//Search Blog Result
export const allSearchBlogs = createAsyncThunk(
  "/allSearchBlogsData",
  async (keyword = "", { rejectWithValue }) => {
    try {
      const response = await api.getSearchBlogs(keyword);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//Single Blog
export const getBlog = createAsyncThunk(
  "/singleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSingleBlog(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//addComment
export const commentAdd = createAsyncThunk(
  "/addComment",
  async ({ id, commentObj }, { rejectWithValue }) => {
    try {
      const response = await api.AddComment(id, commentObj);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// my blogs
export const MyBlogs = createAsyncThunk(
  "/myBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.MyBlogs();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//update Blog
export const blogEdit = createAsyncThunk(
  "/blogEdit",
  async ({ id, blogData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.editBlogs(id, blogData);
      toast.success("Blog Updated Successfully");
      navigate("/my profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//Delete Blog

export const deleteBlog = createAsyncThunk(
  "/blogDelete",
  async ({ id, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.DeleteBlog(id);
      toast.success("Blog Deleted Successfully");
      navigate("/my profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "tour",
  initialState: {
    loading: false,
    getBlogs: {},
    searchData: [],
    singleBlog: {},
    userBlogs: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(addBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.singleBlog = action.payload;
      state.error = "";
    });
    builder.addCase(addBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(allBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(allBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.getBlogs = action.payload;
      state.error = "";
    });
    builder.addCase(allBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(allSearchBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(allSearchBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.searchData = action.payload.blogs;
      state.error = "";
    });
    builder.addCase(allSearchBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.singleBlog = action.payload.blog;
      state.error = "";
    });
    builder.addCase(getBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(commentAdd.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(commentAdd.fulfilled, (state, action) => {
      state.loading = false;
      state.singleBlog = action.payload.blog;
      state.error = "";
    });
    builder.addCase(commentAdd.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(MyBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(MyBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.userBlogs = action.payload.myBlogs;
      state.error = "";
    });
    builder.addCase(MyBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(blogEdit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(blogEdit.fulfilled, (state, action) => {
      state.loading = false;

      state.error = "";
    });
    builder.addCase(blogEdit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(deleteBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userBlogs = state.userBlogs.filter((item) => item._id !== id);
      }
      state.error = "";
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default blogSlice.reducer;
