import {
  ChipProps,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import ProfileCard from "./ProfileCard";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.popper}`]: {
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    margin: 0,
    padding: 0,
    width: 500,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    margin: 0,
    padding: 0,
    maxWidth: "none",
  },
}));

interface UserChipProps {
  username: string;
  sx?: ChipProps["sx"];
  children: any;
}

const UserChip = (props: UserChipProps) => {
  return (
    <HtmlTooltip
      sx={{ ...props.sx }}
      title={<ProfileCard username={props.username} />}
      placement="bottom"
    >
      {props.children}
    </HtmlTooltip>
  );
};

export default UserChip;
