import React from "react";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { login } from "../redux/features/authSlice";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.auth);

  const { error } = User;

  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ formData, toast, navigate }));
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
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            className="border-2 border-[#ccc] mt-5 outline-none w-96 p-2 rounded-sm"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <div className="text-center mt-4">
            <button className="text-white bg-violet-800 text-center rounded-md p-1">
              {" "}
              Log In{" "}
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

export default Login;
