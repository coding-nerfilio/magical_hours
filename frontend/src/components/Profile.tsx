import { Box, BoxProps } from "@mui/material";
import { Profile as ProfileT } from "../types";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import AvatarUsername from "./generic/AvatarUsername";
import StatisticsBadge from "./generic/StatisticsBadge";

interface ProfileProps {
  profile: ProfileT | null;
  isLoading: boolean;
  sx?: BoxProps["sx"];
}

const Extended = (props: ProfileProps) => {
  const iconStyle = { height: 32, width: 32 };
  const labelSize = "1em";
  const valueSize = "1.5em";
  const badgeMaxW = "116px";
  return (
    <Box {...props}>
      <AvatarUsername
        user={props.profile?.user}
        iconSize="100px"
        usernameSize="h4"
        {...props}
      />
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"start"}
          justifyContent={"space-between"}
          mt="20px"
        >
          <StatisticsBadge
            {...props}
            maxW={badgeMaxW}
            label="Horas magicas totales"
            labelSize={labelSize}
            value={props.profile?.metadata.totalHours}
            valueSize={valueSize}
            icon={<AutoAwesomeIcon sx={iconStyle} />}
          />
          <StatisticsBadge
            {...props}
            maxW={badgeMaxW}
            label="Horas espejo"
            labelSize={labelSize}
            value={props.profile?.metadata.mirrorHours}
            valueSize={valueSize}
            icon={<HourglassEmptyIcon sx={iconStyle} />}
          />
          <StatisticsBadge
            {...props}
            maxW={badgeMaxW}
            label="Horas triangulo"
            labelSize={labelSize}
            value={props.profile?.metadata.triangleHours}
            valueSize={valueSize}
            icon={<ChangeHistoryIcon sx={iconStyle} />}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Minimal = (props: ProfileProps) => {
  const iconStyle = { height: 20, width: 20 };
  const labelSize = "0.7em";
  const valueSize = "0.6em";
  const badgeMaxW = "76px";
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={"20px"}
      width={"fit-content"}
      sx={{ boxShadow: 4, ...props.sx }}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <AvatarUsername
          user={props.profile?.user}
          iconSize="75px"
          usernameSize="h5"
          {...props}
        />
      </Box>
      <Box ml="10px">
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mt="20px"
        >
          <StatisticsBadge
            {...props}
            maxW={badgeMaxW}
            label="Horas magicas totales"
            labelSize={labelSize}
            value={props.profile?.metadata.totalHours}
            valueSize={valueSize}
            icon={<AutoAwesomeIcon sx={iconStyle} />}
          />
          <StatisticsBadge
            {...props}
            maxW={badgeMaxW}
            label="Horas espejo"
            labelSize={labelSize}
            value={props.profile?.metadata.mirrorHours}
            valueSize={valueSize}
            icon={<HourglassEmptyIcon sx={iconStyle} />}
          />
          <StatisticsBadge
            {...props}
            maxW={badgeMaxW}
            label="Horas triangulo"
            labelSize={labelSize}
            value={props.profile?.metadata.triangleHours}
            valueSize={valueSize}
            icon={<ChangeHistoryIcon sx={iconStyle} />}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Profile = {
  Extended,
  Minimal,
};

export default Profile;
