import { Stack, Typography } from "@mui/material";
import { ButtonModal } from "./generic/ButtonModal";
import InfoIcon from "@mui/icons-material/Info";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import HistoryIcon from "@mui/icons-material/History";
import { useTranslation } from "react-i18next";

const HourDescription = (props: {
  icon: any;
  title: string;
  children: any;
}) => {
  return (
    <Stack flexDirection={"row"} justifyContent={"start"} mt="15px">
      <Stack flexDirection={"row"} pl="6vw">
        {props.icon}
        <Stack ml="10px">
          <Typography fontWeight={"bold"}>{props.title}</Typography>
          {props.children}
        </Stack>
      </Stack>
    </Stack>
  );
};

export const HourInfoButton = () => {
  const { t } = useTranslation();

  return (
    <ButtonModal
      buttonSx={{ height: "fit-content", width: "fit-content" }}
      label={<InfoIcon />}
      dialogSx={{ height: "fit-content", width: "fit-content" }}
    >
      <Typography
        variant="h4"
        textAlign={"center"}
        fontWeight={"bold"}
        mt="5px"
        mb="20px"
      >
        {t("types_of_mh")}
      </Typography>
      <HourDescription title={t("mirror_hour")} icon={<HourglassEmptyIcon />}>
        {t("mirror_hour_description")}
      </HourDescription>
      <HourDescription title={t("triangle_hour")} icon={<ChangeHistoryIcon />}>
        {t("triangle_hour_description")}
      </HourDescription>
      <HourDescription title={t("reverse_hour")} icon={<HistoryIcon />}>
        {t("reverse_hour_description")}
      </HourDescription>
      <Typography my="20px" mb="10px" textAlign={"center"}>
        {t("hours_description")}
      </Typography>
    </ButtonModal>
  );
};
