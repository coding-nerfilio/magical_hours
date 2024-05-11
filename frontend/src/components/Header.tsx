import { Box, Typography } from "@mui/material";
import GoBack from "./GoBack";
import AccountMenu from "./AccountMenu";

interface HeaderProps {
  title: string;
  goBack?: boolean;
  myAccount?: boolean;
}
const Header = (props: HeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        mt: "10px",
      }}
    >
      <Box sx={{ minWidth: "20%", paddingLeft: "10%" }}>
        {props.goBack && <GoBack />}
      </Box>

      <Typography textAlign={"center"} width={"40%"} variant="h4">
        {props.title}
      </Typography>

      <Box sx={{ minWidth: "20%", paddingRight: "10%" }}>
        {props.myAccount && <AccountMenu />}
      </Box>
    </Box>
  );
};

export default Header;
