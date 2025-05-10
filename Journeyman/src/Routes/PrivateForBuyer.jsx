import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import LoadingState from "../Components/LoadingState";


const PrivateForBuyer = ({ children }) => {
  
  const {  userData,loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingState />;
  }

  if (userData?.role === "Buyer") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default PrivateForBuyer;