import React from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../redux/features/blogSlice";
import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";

const Home = () => {
  const { getBlogs, loading, error } = useSelector((state) => ({
    ...state.blog,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allBlogs());
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-[92vh] overflow-y-auto scrollbar-hide ml-3  mt-3 flex flex-col md:gap-5  lg:grid lg:grid-cols-3 lg:gap-2 lg:ml-60 md:grid md:grid-cols-2  -z-10 ">
          {getBlogs.blogs &&
            getBlogs.blogs.map((item, index) => (
              <BlogCard
                key={index}
                id={item._id}
                title={item.title}
                description={item.description}
                image={item.image}
                name={item.name}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
