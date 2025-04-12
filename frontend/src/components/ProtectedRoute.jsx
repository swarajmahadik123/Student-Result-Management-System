import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const ProtectedRoute = ({ role, children }) => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data } = await authAPI.verify();
        
        if (data.role !== role) throw new Error("Unauthorized access");
        setVerified(true);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyAuth();
  }, [navigate, role]);

  return verified ? children : null;
};

export default ProtectedRoute;
