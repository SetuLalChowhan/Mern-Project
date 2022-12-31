import React from "react";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { register } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();

  const User = useSelector((state) => state.auth);

  const { loading, user, error } = User;
  const navigate = useNavigate();
  useEffect(() => {
    if (error.length >= 50) {
      const validateError = error.split(":")[2];
      toast.error(validateError);
    } else {
      error && toast.error(error);
    }
  }, [error]);
  const initialValues = {
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password should match");
    }

    dispatch(register({ formData, toast, navigate }));
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
                setFormData({ ...formData, image: base64 })
              }
            />
          </div>
          <input
            className="border-2 border-[#ccc] mt-5 outline-none w-96 p-2 rounded-sm"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
            name="password"
          />
          <input
            className="border-2 border-[#ccc] mt-5 outline-none w-96 p-2 rounded-sm"
            type="password"
            placeholder="Enter your confirm password"
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
          <div className="text-center mt-4">
            <button className="text-white bg-violet-800 text-center rounded-md p-1">
              {" "}
              Register{" "}
            </button>
          </div>
        </form>
      </div>
      <Link className="mt-2 text-violet-800" to="/register">
        {" "}
        <p>Don't have an account? Sign Up</p>{" "}
      </Link>
    </div>
  );
};

export default Register;
