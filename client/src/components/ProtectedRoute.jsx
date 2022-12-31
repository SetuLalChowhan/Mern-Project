import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protectedroutes = ({ Component }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const login = localStorage.getItem("user");
       

        if (!login) {
            navigate("/login");
        }
    },[]);
    return (
        <div>
            <Component />
        </div>
    );
};

export default Protectedroutes;