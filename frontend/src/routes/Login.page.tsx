import { Box, Container, Typography } from "@mui/material";
import ControlledForm from "../components/ControlledForm";
import { ResponseHandler, useApi } from "../hooks/useApi";
import Auth from "../services/Auth";
import { Link, useHistory } from "react-router-dom";
import redirectIfLogged from "../hocs/redirectIfLogged";
import { useTranslation } from "react-i18next";

const useLogic = () => {
  const history = useHistory();
  const loginApi = useApi.Auth.login();

  const onSubmitForm = async (formValues: any) => {
    const values = formValues as { username: string; password: string };

    loginApi
      .execute(values)
      .then((response) =>
        ResponseHandler<(typeof response)["data"]>(
          response,
          (_, data) => {
            Auth.saveUserData(data.user);
            Auth.setAuthToken(data.token);

            history.push("/app/home");
            window.location.reload();
          },
          (_, message) => {
            alert(message);
          }
        )
      )
      .catch((_) => {
        alert("error");
      });
  };
  return { onSubmitForm };
};

const LoginPage = () => {
  const { t } = useTranslation();
  const formFields = [
    { name: "username", type: "text", label: t("username") },
    { name: "password", type: "password", label: t("password") },
  ];

  const logic = useLogic();

  return (
    <Box height={"100vh"} width={"100vw"} paddingTop={"100px"}>
      <Container maxWidth="sm">
        <Typography variant="h2">{t("title")}</Typography>
        <Typography variant="h5">{t("login")}</Typography>
        <ControlledForm
          fields={formFields}
          onSubmit={logic.onSubmitForm}
          submitButton={{ label: t("do_login") }}
        />
        <Typography
          paddingTop="30px"
          textAlign={"center"}
          variant="h6"
          component={Link}
          to="/register"
        >
          {t("register_invitation")}
        </Typography>
      </Container>
    </Box>
  );
};

export default redirectIfLogged(LoginPage);
