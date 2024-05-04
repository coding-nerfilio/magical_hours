import { useHistory } from "react-router-dom";
import Auth from "../services/Auth";

const redirectIfNotLogged = (Component: React.ComponentType<any>) => {
  const RedirectComponent: React.FC = (props) => {
    const history = useHistory();

    if (!Auth.isLogged()) {
      history.replace("/register");
      window.location.reload();
    } else {
      return <Component {...props} />;
    }
    return null;
  };
  return RedirectComponent;
};

export default redirectIfNotLogged;
