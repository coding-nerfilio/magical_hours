import { Redirect } from "react-router-dom";
import Auth from "../services/Auth";

const redirectIfLogged = (Component: React.ComponentType<any>) => {
  const RedirectComponent: React.FC = (props) => {
    return Auth.isLogged() ? (
      <Redirect exact to="/register" />
    ) : (
      <Component {...props} />
    );
  };
  return RedirectComponent;
};
export default redirectIfLogged;
