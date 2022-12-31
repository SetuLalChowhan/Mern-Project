import React from "react";
import { useState } from "react";
import FileBase from "react-file-base64";
import { blogEdit } from "../redux/features/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditBlog = () => {
  const initialState = {
    title: "",
    description: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userBlogs, error } = useSelector((state) => ({ ...state.blog }));

  const { id } = useParams();
  const [blogData, setBlogData] = useState(initialState);

  useEffect(() => {
    const singleBlogData = userBlogs.find((blog) => blog._id === id);

    setBlogData(singleBlogData);
  }, [id]);

  const { title, description } = blogData;

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(blogEdit({ id, blogData, navigate, toast }));
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div>
        <h1>Edit Your Blog</h1>
      </div>
      <div className="mt-4">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="border-2 border-[#ccc] outline-none w-96 p-2 rounded-sm"
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleChange}
            name="title"
            required
          />
          <textarea
            className="border-2 border-[#ccc] outline-none w-96 h-48 p-2 rounded-sm mt-5"
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleChange}
            name="description"
            required
          />
          <div className=" mt-5" id="email">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setBlogData({ ...blogData, image: base64 })
              }
            />
          </div>

          <div className="text-center mt-4">
            <button className="text-white bg-violet-800 text-center rounded-md p-1">
              {" "}
              Edit Blog{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
