import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { User } from "../../types";

interface AvatarUsernameProps {
  user: User | undefined;
  isLoading: boolean;
  iconSize: string;
  usernameSize: string;
}

const AvatarUsername = (props: AvatarUsernameProps) => {
  return props.isLoading || props.user === undefined ? (
    <Skeleton
      height={200}
      width={200}
      sx={{
        m: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    />
  ) : (
    <Box
      maxHeight={200}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Avatar sx={{ width: props.iconSize, height: props.iconSize }}>
        {props.user.username[0].toUpperCase()}
      </Avatar>
      <Typography variant={props.usernameSize as any} mt="10px">
        {props.user.username}
      </Typography>
    </Box>
  );
};

export default AvatarUsername;
