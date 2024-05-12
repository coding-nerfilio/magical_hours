import { Link, useHistory } from "react-router-dom";
import ControlledForm from "../components/generic/ControlledForm";
import Auth from "../services/Auth";
import { Box, Container, Typography } from "@mui/material";
import redirectIfLogged from "../hocs/redirectIfLogged";
import { Status, useApi } from "../hooks/useApi";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const registerApi = useApi.Auth.register();

  const onSubmit = async (formValues: any) => {
    const values = formValues as {
      username: string;
      password: string;
      rePassword: string;
    };

    let response = await registerApi.execute({ ...values });
    console.log(response);
    if (response !== null) {
      if (response.status == Status.OK) {
        Auth.saveUserData(response.data.user!);
        Auth.setAuthToken(response.data.token!);

        history.push("/app/home");
        window.location.reload();
      } else {
        alert(response.status!);
      }
    } else {
      alert("errorr");
    }
  };

  return (
    <Box height={"100vh"} width={"100vw"} paddingTop={"100px"}>
      <Container maxWidth="sm">
        <Typography variant="h2">{t("title")}</Typography>
        <Typography variant="h5">{t("create_account")}</Typography>
        <Typography variant="h6">{t("fill_the_input_below")}</Typography>
        <ControlledForm
          fields={[
            { name: "username", type: "text", label: t("username") },
            { name: "password", type: "password", label: t("password") },
            {
              name: "rePassword",
              type: "password",
              label: t("repassword"),
            },
          ]}
          onSubmit={onSubmit}
          submitButton={{ label: t("do_register") }}
        />
        <Typography
          paddingTop="30px"
          textAlign={"center"}
          variant="h6"
          component={Link}
          to="/login"
        >
          {t("login_invitation")}
        </Typography>
      </Container>
    </Box>
  );
};
export default redirectIfLogged(RegisterPage);
