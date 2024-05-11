import { Box, CircularProgress, Container, Typography } from "@mui/material";
import redirectIfNotLogged from "../../hocs/redirectIfNotLogged";
import { useApi } from "../../hooks/useApi";
import { useEffect } from "preact/hooks";
import { useTranslation } from "react-i18next";
import UserChip from "../../components/UserChip";

const RankingPage = () => {
  const { t } = useTranslation();
  const rankingApi = useApi.Ranking.getRanking();
  useEffect(() => {
    rankingApi.execute();
  }, []);

  return (
    <Box height={"80vh"}>
      <Container maxWidth="sm">
        <Box textAlign={"center"}>
          <Box>
            {rankingApi.isLoading || rankingApi.response === null ? (
              <CircularProgress />
            ) : (
              rankingApi.response.data.ranking.entries.map((entry, idx) => (
                <UserChip key={idx} username={entry.user.username}>
                  <Box
                    sx={{
                      bgcolor: "#e4e4e4",
                      p: "20px",
                      mb: "3px",
                    }}
                  >
                    {entry.user.username} - {entry.points}
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
export default redirectIfNotLogged(RankingPage);
