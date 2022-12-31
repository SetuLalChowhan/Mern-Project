import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { setUser } from "./redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AddBlog from "./pages/AddBlog";
import SearchData from "./pages/SearchData";
import Protectedroutes from "./components/ProtectedRoute";
import SingleBlog from "./pages/SingleBlog";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import EditBlog from "./pages/EditBlog";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add blog"
            element={<Protectedroutes Component={AddBlog} />}
          />
          <Route path="/search/:data" element={<SearchData />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route
            path="/my profile"
            element={<Protectedroutes Component={UserProfile} />}
          />
          <Route
            path="/my profile/editprofile/:id"
            element={<Protectedroutes Component={EditProfile} />}
          />
          <Route
            path="/my profile/editBlog/:id"
            element={<Protectedroutes Component={EditBlog} />}
          />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}

export default App;
