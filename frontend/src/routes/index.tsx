import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import RegisterPage from "./Register.page";
import AppRouter from "./app";
import LoginPage from "./Login.page";
import { Suspense } from "preact/compat";

const MainRouter = () => {
  return (
    <Suspense fallback="loading">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/register" />} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/app/*" component={AppRouter} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default MainRouter;
