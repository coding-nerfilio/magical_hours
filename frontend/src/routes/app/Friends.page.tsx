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
import UserChip from "../../components/UserChip";

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
    <Box height={"80vh"} overflow={"auto"}>
      <Container maxWidth="sm">
        <Box display={"flex"} justifyContent={"center"}>
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
        <Box textAlign={"center"}>
          <Box mt="50px">
            {getFriendsApi.isLoading || getFriendsApi.response === null ? (
              <CircularProgress />
            ) : getFriendsApi.response.data.friends.length === 0 ? (
              <div>{t("no_friends")}</div>
            ) : (
              getFriendsApi.response.data.friends.map((user, idx) => (
                <UserChip key={idx} username={user.username}>
                  <Box
                    sx={{
                      bgcolor: "#e4e4e4",
                      p: "20px",
                      mb: "3px",
                      userSelect: "none",
                    }}
                  >
                    {user.username}
                  </Box>
                </UserChip>
              ))
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default redirectIfNotLogged(FriendsPage);
