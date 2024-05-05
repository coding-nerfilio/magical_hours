import { Box, CircularProgress, Container, Typography } from "@mui/material";
import redirectIfNotLogged from "../../hocs/redirectIfNotLogged";
import { useApi } from "../../hooks/useApi";
import { useEffect } from "preact/hooks";
import { useTranslation } from "react-i18next";

const RankingPage = () => {
  const { t } = useTranslation();
  const rankingApi = useApi.Ranking.getRanking();
  useEffect(() => {
    rankingApi.execute();
  }, []);

  return (
    <Box height={"90vh"}>
      <Container maxWidth="sm">
        <Box textAlign={"center"}>
          <Typography variant="h4" pt="10vh">
            {t("ranking")}
          </Typography>
          <Box mt="50px">
            {rankingApi.isLoading || rankingApi.response === null ? (
              <CircularProgress />
            ) : (
              rankingApi.response.data.ranking.entries.map((entry, idx) => (
                <div key={idx}>
                  {entry.user.username} - {entry.points}
                </div>
              ))
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default redirectIfNotLogged(RankingPage);
