import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  useLocation,
} from "react-router-dom";
import HomePage from "./Home.page";

import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import { useState } from "preact/hooks";
import RankingPage from "./Ranking.page";
import FriendsPage from "./Friends.page";
import { useTranslation } from "react-i18next";

const AppRouter = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  return (
    <Router>
      <Switch>
        <Route path="/app" exact>
          <Redirect to="/app/home" />
        </Route>
        <Route path="/app/home" component={HomePage} />
        <Route path="/app/ranking" component={RankingPage} />
        <Route path="/app/friends" component={FriendsPage} />
      </Switch>
      <BottomNavigation
        height="10vh"
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/app/ranking"
          label={t("ranking")}
          value="/app/ranking"
          icon={<EmojiEventsIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/app/home"
          label={t("title")}
          value="/app/home"
          icon={<HistoryToggleOffIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/app/friends"
          label={t("social")}
          value="/app/friends"
          icon={<GroupIcon />}
        />
      </BottomNavigation>
    </Router>
  );
};

export default AppRouter;
