import { Box, Container, Typography } from "@mui/material";
import ControlledForm from "../components/ControlledForm";
import { ResponseHandler, useApi } from "../hooks/useApi";
import Auth from "../services/Auth";
import { Link, useHistory } from "react-router-dom";
import redirectIfLogged from "../hocs/redirectIfLogged";

const formFields = [
  { name: "username", type: "text", label: "Username" },
  { name: "password", type: "password", label: "Password" },
];

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
          (status) => {
            alert(status);
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
  const logic = useLogic();

  return (
    <Box height={"100vh"} width={"100vw"} paddingTop={"100px"}>
      <Container maxWidth="sm">
        <Typography variant="h2">Magical Hours</Typography>
        <Typography variant="h5">Inicio de sesión</Typography>
        <ControlledForm
          fields={formFields}
          onSubmit={logic.onSubmitForm}
          submitButton={{ label: "Iniciar sesión" }}
        />
        <Typography
          paddingTop="30px"
          textAlign={"center"}
          variant="h6"
          component={Link}
          to="/register"
        >
          ¿Aun no posees una cuenta?
        </Typography>
      </Container>
    </Box>
  );
};

export default redirectIfLogged(LoginPage);
