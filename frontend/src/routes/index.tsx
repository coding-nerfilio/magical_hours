import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import RegisterPage from "./Register.page";
import AppRouter from "./app";
import LoginPage from "./Login.page";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/register" />} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/app/*" component={AppRouter} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
