import { Link, useHistory } from "react-router-dom";
import ControlledForm from "../components/ControlledForm";
import Auth from "../services/Auth";
import { Box, Container, Typography } from "@mui/material";
import redirectIfLogged from "../hocs/redirectIfLogged";
import { Status, useApi } from "../hooks/useApi";

const RegisterPage = () => {
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
        <Typography variant="h2">Magical Hours</Typography>
        <Typography variant="h5">Create Account</Typography>
        <Typography variant="h6">Please fill the input below</Typography>
        <ControlledForm
          fields={[
            { name: "username", type: "text", label: "Username" },
            { name: "password", type: "password", label: "Password" },
            {
              name: "rePassword",
              type: "password",
              label: "Re-enter password",
            },
          ]}
          onSubmit={onSubmit}
          submitButton={{ label: "Sign up" }}
        />
        <Typography
          paddingTop="30px"
          textAlign={"center"}
          variant="h6"
          component={Link}
          to="/login"
        >
          ¿Ya posees una cuenta? Inicia sesión
        </Typography>
      </Container>
    </Box>
  );
};
export default redirectIfLogged(RegisterPage);
