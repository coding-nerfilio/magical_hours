import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import redirectIfNotLogged from "../../hocs/redirectIfNotLogged";
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";

const FriendsPage = () => {
  const { t } = useTranslation();
  const getFriendsApi = useApi.Social.getFriends();
  const addFriendApi = useApi.Social.addFriend();

  const [username, setUsername] = useState("");

  useEffect(() => {
    getFriendsApi.execute();
  }, []);

  const onClick = async () => {
    if (username.length === 0) {
      alert(t("error_empty_username"));
      return;
    }

    const response = await addFriendApi.execute({ username });
    getFriendsApi.setResponse(response);
  };

  return (
    <Box height={"90vh"} overflow={"auto"}>
      <Container maxWidth="sm">
        <Box textAlign={"center"}>
          <Typography variant="h4" pt="10vh">
            {t("friends")}
          </Typography>

          <Box mt="50px">
            {getFriendsApi.isLoading || getFriendsApi.response === null ? (
              <CircularProgress />
            ) : getFriendsApi.response.data.friends.length === 0 ? (
              <div>{t("no_friends")}</div>
            ) : (
              getFriendsApi.response.data.friends.map((user, idx) => (
                <div key={idx}>{user.username}</div>
              ))
            )}
          </Box>
          <Box display={"flex"}>
            <TextField
              value={username}
              onChange={(e) => setUsername((e.target as any).value)}
              variant="outlined"
              placeholder={t("username")}
            />
            <Button onClick={onClick} disabled={addFriendApi.isLoading}>
              {t("add_friend")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default redirectIfNotLogged(FriendsPage);
