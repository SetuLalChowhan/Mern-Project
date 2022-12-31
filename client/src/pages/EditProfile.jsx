import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import FileBase from "react-file-base64";
import { Link, useNavigate } from "react-router-dom";
import { profileUpdate } from "../redux/features/authSlice";

const EditProfile = () => {
  const dispathc = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => ({ ...state.auth }));

  const User = user?.user;
  const initialValues = {
    name: User?.name,
    email: User?.email,
  };

  const [updateProfileData, setUpdateProfileData] = useState(initialValues);

  const { name, email } = updateProfileData;

  const handleChange = (e) => {
    setUpdateProfileData({
      ...updateProfileData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name || email) {
      dispathc(profileUpdate({ updateProfileData, toast, navigate }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div>
        <RxAvatar className=" text-violet-800" size={60} />
      </div>
      <div className="mt-4">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="border-2 border-[#ccc] outline-none w-96 p-2 rounded-sm"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange}
            name="name"
          />
          <input
            className="border-2 border-[#ccc] outline-none w-96 p-2 rounded-sm mt-5"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            name="email"
          />
          <div className=" mt-5" id="email">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setUpdateProfileData({ ...updateProfileData, image: base64 })
              }
            />
          </div>
          <div className="text-center mt-4">
            <button className="text-white bg-violet-800 text-center rounded-md p-1">
              {" "}
              Edit{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
