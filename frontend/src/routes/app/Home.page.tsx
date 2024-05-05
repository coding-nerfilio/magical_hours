import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  CircularProgressProps,
  Container,
  Typography,
} from "@mui/material";
import redirectIfNotLogged from "../../hocs/redirectIfNotLogged";
import { useApi } from "../../hooks/useApi";
import useTime from "../../hooks/useTime";
import useCooldown from "../../hooks/useCooldown";
import { useEffect } from "preact/hooks";
import { useTranslation } from "react-i18next";

interface SubmitButtonProps {
  onClick: any;
  isLoading: boolean;
  buttonStyles?: ButtonProps;
  circularProgressStyles?: CircularProgressProps;
  buttonlabel: string;
}
const SubmitButton = (props: SubmitButtonProps) =>
  props.isLoading ? (
    <CircularProgress {...props.circularProgressStyles} />
  ) : (
    <Button {...props.buttonStyles} onClick={props.onClick}>
      {props.buttonlabel}
    </Button>
  );

const HomePage = () => {
  const submitHourApi = useApi.Game.submitHour();
  const time = useTime();
  const cooldown = useCooldown();

  const { t } = useTranslation();

  const onClick = () => {
    submitHourApi.execute({ timezone: new Date().getTimezoneOffset() / -60 });
    cooldown.enableCooldown();
  };

  useEffect(() => {
    if (submitHourApi.response !== null) alert(submitHourApi.response.message);
  }, [submitHourApi.response]);
  return (
    <Box height={"90vh"} width={"100vw"}>
      <Container fixed maxWidth="sm">
        <Typography variant="h2" textAlign={"center"} pt={"10vh"}>
          {time.value}
        </Typography>
        <Box textAlign={"center"} mt="5vh">
          <SubmitButton
            buttonlabel={t("send_hour")}
            buttonStyles={{
              disabled: cooldown.cooldown != null && cooldown.cooldown! > 0,
            }}
            onClick={onClick}
            isLoading={submitHourApi.isLoading}
          />
          {cooldown.cooldown != null && cooldown.cooldown! > 0 && (
            <Typography>
              {t("wait")} {cooldown.cooldown}s
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};
export default redirectIfNotLogged(HomePage);
