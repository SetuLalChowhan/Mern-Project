import React, { useState } from "react";
import { BsDoorOpen } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { allBlogs} from "../redux/features/blogSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState("no result");

  const handleSearchChange = (e) => {
      setSearchData(e.target.value);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      navigate(`search/${searchData}`);
    
    
  };

  const User = useSelector((state) => state.auth);
  const { loading, user, error } = User;

  console.log(user);

  const [nav, setNav] = useState("true");

  const handleChange = () => {
    setNav(!nav);
  };
  return (
    <div className="w-full h-14 bg-violet-700 z-10">
      <div className="flex justify-between">
        <div className="flex">
          <Link to = '/'>
          <div className=" flex flex-col justify-center ml-3">
            <div className="flex justify-center items-center">
              <BsDoorOpen className="text-white font-bold" size={30} />
            </div>
            <p className="text-white">BloG APp</p>
          </div>
          </Link>
          <ul className=" hidden  lg:flex text-white justify-center items-center gap-10 text-xl ml-16 ">
            <Link to="/">
              <li>Home</li>
            </Link>

            {user && (
              <Link to="/add blog">
                <li>Add Blog</li>
              </Link>
            )}
            {user && (
              <Link to='my profile'>
                <li>Profile</li>
              </Link>
            )}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" hidden  md:flex justify-center items-center lg:mr-72"
        >
          <input
            type="text"
            placeholder="Search Blog "
            className="p-2 rounded-lg  md:w-96 outline-none "
            onChange={handleSearchChange}
          />
        </form>
        <ul className=" hidden lg:flex  lg:mr-8 justify-center items-center">
          {user ? (
            <button
              onClick={() => {
                dispatch(setLogout())
                ;
                navigate('/login')
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button>Log In</button>
            </Link>
          )}
        </ul>
        <div
          className="text-white flex justify-center items-center mr-6 lg:hidden"
          onClick={handleChange}
        >
          {nav ? (
            <GiHamburgerMenu size={30} />
          ) : (
            <MdClose className="text-white" size={30} />
          )}
        </div>
      </div>
      <div
        className={
          nav
            ? "hidden"
            : "flex flex-col bg-violet-700 text-xl text-white z-10 sticky "
        }
      >
        <form   onSubmit={handleSubmit} className=" flex md:hidden justify-center items-center mt-4 z-10  ">
          <input
            type="text"
            placeholder="Search Tour "
            className=" p-1 rounded-lg  md:w-96 outline-none "
            onChange={handleSearchChange}
            
          />
        </form>
        <ul className="flex flex-col l mt-2 p-3  z-10">
          <Link to="/" className=" border-b-2 border-[#ccc] text-center ">
            <li>Home</li>
          </Link>
          {user && (
            <Link to='/add blog' className=" border-b-2 border-[#ccc] text-center mt-2 mb-2 z-10 ">
              <li>Add Blog</li>
            </Link>
          )}
          {user && (
            <Link to='my profile' className=" border-b-2 border-[#ccc] text-center mt-2 mb-2 z-10 ">
              <li>Profile</li>
            </Link>
          )}
        </ul>
        <ul className=" flex justify-center items-center text-xl z-10 ">
          {user ? (
            <button
              onClick={() => {
                dispatch(setLogout());
                navigate('/login')
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button>Log In</button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
