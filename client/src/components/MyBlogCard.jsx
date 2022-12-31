import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../redux/features/blogSlice";
import { toast } from "react-hot-toast";

const MyBlogCard = ({ name, id, title, description, image, TotalComment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "......";
      return str;
    } else {
      return str;
    }
  };
  return (
    <div className=" flex md:flex-row flex-col justify-between shadow-md md:h-32  w-full mb-3">
      <div className=" flex  gap-5">
        <img className="w-40" src={image} alt="image" />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-sm">{excerpt(description)}</p>
          <Link to={`/blog/${id}`}>
            <button className="p-0 w-24 text-sm">Read More</button>
          </Link>
          <p className="mt-2">Total Comments : {TotalComment}</p>
        </div>
      </div>
      <div className=" justify-between mt-4 md:mt-0 md:mb-0 mb-2 flex md:justify-center md:items-center gap-3 mr-4">
        <Link to={`/my profile/editBlog/${id}`}>
          <button className="text-md p-0 w-20 rounded-md">Edit</button>
        </Link>
        <button
          className="text-md p-0 w-20 bg-red-700 rounded-md"
          onClick={() => {
            dispatch(deleteBlog({ id, navigate, toast }));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyBlogCard;
