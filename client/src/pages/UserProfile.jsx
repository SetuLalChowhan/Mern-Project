import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import MyBlogCard from "../components/MyBlogCard";
import { MyBlogs } from "../redux/features/blogSlice";
import Loading from "../components/Loading";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userBlogs, loading, error } = useSelector((state) => ({
    ...state.blog,
  }));

  const User = user?.user;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(MyBlogs());
  }, []);

  console.log(User);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="flex justify-center shadow-lg rounded-full ">
          <img className="rounded-full  w-52" src={User?.image} alt="image" />
        </div>
        <h1 className="mt-2 text-xl"> {User?.name} </h1>
        <p className="font-semibold">{User?.email}</p>
        <Link to={`/my profile/editprofile/${User?._id}`}>
          <button className="rounded-md mt-2 w-24 text-sm">Edit Profile</button>
        </Link>
      </div>
      <h1 className="text-center text-3xl mt-10"> My Blogs </h1>
      <hr></hr>
      <Container>
        {loading ? (
          <Loading />
        ) : userBlogs?.length > 0 ? (
          <div className="mt-3">
            {userBlogs.map((item, index) => (
              <MyBlogCard
                key={index}
                id={item?._id}
                name={item?.name}
                title={item?.title}
                description={item?.description}
                image={item?.image}
                TotalComment={item?.numOfComment}
              />
            ))}
          </div>
        ) : (
          "You have no Blogs"
        )}
      </Container>
    </>
  );
};

export default UserProfile;
