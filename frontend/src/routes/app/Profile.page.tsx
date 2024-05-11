import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import ProfileCard from "../../components/Profile";
import { useApi } from "../../hooks/useApi";
import { useEffect } from "preact/hooks";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { username }: any = useParams();

  const api = useApi.Social.getMinimalProfile();

  useEffect(() => {
    api.execute(undefined, { username });
  }, [username]);

  return (
    <Box>
      <Header goBack title={t("profile")} myAccount={false} />
      <Container fixed maxWidth="sm">
        <ProfileCard.Extended
          profile={api.response?.data!}
          isLoading={api.isLoading}
          sx={{ mt: "10vh" }}
        />
      </Container>
    </Box>
  );
};

export default ProfilePage;
