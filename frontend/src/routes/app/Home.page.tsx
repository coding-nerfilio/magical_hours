import { Box, Container, Stack, Typography } from "@mui/material";
import redirectIfNotLogged from "../../hocs/redirectIfNotLogged";
import { useApi } from "../../hooks/useApi";
import useTime from "../../hooks/useTime";
import useCooldown from "../../hooks/useCooldown";
import { useEffect } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { HourInfoButton } from "../../components/HoursInfoButton";
import { SubmitButton } from "../../components/SubmitButton";

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
    if (submitHourApi.response !== null)
      alert(t(submitHourApi.response.message));
  }, [submitHourApi.response]);
  return (
    <Box height={"80vh"} width={"100vw"}>
      <Container fixed maxWidth="sm">
        <Stack alignItems={"center"}>
          <Typography variant="h2" textAlign={"center"} pt={"10vh"}>
            {time.value}
          </Typography>
          <HourInfoButton />
        </Stack>

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
