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
import SettingsPage from "./Settings.page";
import ProfilePage from "./Profile.page";
import Header from "../../components/Header";

const AppRouter = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  console.log(value);
  const headerLabel = {
    "/app/settings": t("settings"),
    "/app/profile/": t("profile"),
    "/app/home": t("title"),
    "/app/ranking": t("ranking"),
    "/app/friends": t("friends"),
  };

  const goBack = {};

  const myAccount = {
    "/app/settings": true,
    "/app/home": true,
    "/app/ranking": true,
    "/app/profile": false,
    "/app/friends": true,
  };

  return (
    <Router>
      <Switch>
        <Route path="/app/settings" component={SettingsPage} />
        <Route path="/app/profile/:username" component={ProfilePage} />
        <Route path="/app/*">
          <Header
            goBack={(goBack as any)[value]}
            title={(headerLabel as any)[value]}
            myAccount={(myAccount as any)[value] || false}
          />
          <Switch>
            <Route path="/app" exact>
              <Redirect to="/app/home" />
            </Route>
            <Route path="/app/home" component={HomePage} />
            <Route path="/app/friends" component={FriendsPage} />
            <Route path="/app/ranking" component={RankingPage} />
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
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
