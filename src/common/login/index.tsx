import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../app/store";

const Login: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const location = useLocation();

  return profile.isAuthenticated ? (
    <a href={"/api/logout?redirectUri=" + encodeURIComponent(location.pathname)}>Logout</a>
  ) : (
    <a href={"/api/login?redirectUri=" + encodeURIComponent(location.pathname)}>Login</a>
  );
};
Login.displayName = "Login";

export default Login;
