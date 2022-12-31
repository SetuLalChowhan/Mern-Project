import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => {
  return API.post("api/v1/login", formData);
};
export const signUp = (formData) => {
  return API.post("api/v1/register", formData);
};
export const addBlog = (blogData) => {
  return API.post("api/v1/createBlog",blogData);
};
export const getAllBlogs = () => {
  return API.get(`api/v1/blogs`);
};
export const getSearchBlogs = (keyword) => {
  return API.get(`api/v1/blogs?keyword=${keyword}`);
};
export const getSingleBlog= (id) => {
  return API.get(`api/v1/blog/${id}`);
};
export const AddComment= (id,commentObj) => {
  console.log(commentObj)
  return API.put(`api/v1/comment/${id}`,commentObj);
};
export const updateMe= (updateProfileData) => {
 
  return API.put(`api/v1/updateMe`,updateProfileData);
};
export const MyBlogs= () => {
 
  return API.get(`api/v1/myBlogs`);
};
export const editBlogs= (id, blogData) => {
  console.log(blogData)
 
  return API.put(`api/v1/blog/${id}`, blogData);
};
export const DeleteBlog= (id) => {

  return API.delete(`api/v1/blog/${id}`);
};
