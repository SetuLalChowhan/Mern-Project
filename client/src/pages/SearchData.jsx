import React from "react";
import TourCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { allSearchBlogs } from "../redux/features/blogSlice";
import Loading from "../components/Loading";

const SearchData = () => {
  const dispatch = useDispatch();
  const { data } = useParams();
  const { searchData, loading, error } = useSelector((state) => ({
    ...state.blog,
  }));

  useEffect(() => {
    if (data !== "no result") {
      dispatch(allSearchBlogs(data));
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : searchData.length === 0 ? (
        <div className="text-3xl text-center mt-40">
          No result found..Search with correct spelling{" "}
        </div>
      ) : (
        <div className="h-[92vh] overflow-y-auto scrollbar-hide mt-3 flex flex-col gap-5  lg:grid lg:grid-cols-3 lg:gap-2 lg:ml-60 md:grid md:grid-cols-2  -z-10 ">
          {searchData &&
            searchData.map((item, index) => (
              <TourCard
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

export default SearchData;
