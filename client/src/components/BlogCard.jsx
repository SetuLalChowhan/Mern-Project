import { Link } from "react-router-dom";
import React from "react";
import {useSelector} from 'react-redux'

const BlogCard = ({ id, title, description, image, name }) => {

  const {user} = useSelector((state)=>(({...state.auth})))
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "......";
      return str;
    } else {
      return str;
    }
  };
  return (
    <div className=" max-w-sm border-2 rounded-lg shadow-lg  md:h-70 h-96 ">
      <img className="rounded-t-lg h-60 w-96 " src={image} alt="" />

      <div className="p-5">
        <h5 className=" text-2xl font-bold tracking-tight text-black ">
          {title}
        </h5>

        <p className=" font-normal text-black ">
          {excerpt(description)}{" "}
          <Link to={`/blog/${id}`}><button className=" text-sm w-24">Read More</button>{" "}</Link>
        </p>

        <h5 className=" text-2xl font-bold tracking-tight text-black text-right ">
          {name}
        </h5>
      </div>
    </div>
  );
};

export default BlogCard;
