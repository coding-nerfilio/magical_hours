import { Box, Skeleton, Typography } from "@mui/material";

interface StatisticsBadgeProps {
  icon: any;
  label: string;
  value: number | undefined;
  isLoading: boolean;
  valueSize: string;
  labelSize: string;
  maxW: string;
}

const StatisticsBadge = (props: StatisticsBadgeProps) => {
  return props.isLoading || props.value === undefined ? (
    <Skeleton height={80} width={80} sx={{ m: "10px" }} />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "start",
        justifyContent: "start",
        alignSelf: "start",
        alignItems: "center",
        width: props.maxW,
        height: "inherit",
      }}
    >
      <Typography fontSize={props.valueSize}>{props.value}</Typography>

      {props.icon}

      <Typography
        fontSize={props.labelSize}
        maxWidth={"0.6"}
        textAlign={"center"}
        sx={{ wordWrap: "break-word" }}
      >
        {props.label}
      </Typography>
    </Box>
  );
};
export default StatisticsBadge;
