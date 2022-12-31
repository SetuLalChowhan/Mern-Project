import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { commentAdd, getBlog } from "../redux/features/blogSlice";
import { Container } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBlog, error } = useSelector((state) => ({ ...state.blog }));
  const [comment, setComment] = useState("");

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(getBlog(id));
  }, [id]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentObj = {
      comment,
    };
    dispatch(commentAdd({ id, commentObj }));
  };

  console.log("Hello")
  return (
    <Container>
      <img
        className="w-full lg:h-[800px] rounded-sm "
        src={singleBlog?.image}
        alt="image"
      />

      <h1 className="text-3xl mt-1">{singleBlog?.title}</h1>
      <div className="max-w-auto h-48 border-2 rounded-sm  shadow-md break-all overflow-y-auto ">
        <p className=""> {singleBlog?.description} </p>
      </div>

      <form
        className=" mt-3 flex justify-center items-center flex-col"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 border-[#ccc] outline-none w-96 p-2 rounded-sm"
          type="text"
          placeholder="Add your Comment"
          name="comment"
          value={comment}
          onChange={handleChange}
        />
        <button className="rounded-sm p-1 mt-3">Submit</button>
      </form>

      <h1 className="text-center text-3xl font-semibold">
        Commnets : {singleBlog?.numOfComment}
      </h1>
      <div className="border-2 rounded-lg shadow-lg ">
        {singleBlog.comments &&
          singleBlog.comments.map((item, index) => {
            return (
              <div
                key={index}
                className="  border-2 rounded-lg shadow-lg bg-slate-100 text-black  w-fit  break-all overflow-y-auto mb-2 "
              >
                <p className="text-2xl">{item.name}</p>
                <p className="text-lg"> {item.comment}</p>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default SingleBlog;
