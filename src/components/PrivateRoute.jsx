import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";

const PrivateRoute = ({ component: Component, redirectTo = "/welcome" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  return isLoggedIn || isRefreshing ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
