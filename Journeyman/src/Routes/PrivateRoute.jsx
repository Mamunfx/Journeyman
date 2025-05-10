import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import {AuthContext} from "../Context/AuthProvider"
import LoadingState from "../Components/LoadingState"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingState />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default PrivateRoute;
