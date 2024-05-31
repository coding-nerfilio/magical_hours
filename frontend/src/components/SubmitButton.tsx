import {
  Button,
  ButtonProps,
  CircularProgress,
  CircularProgressProps,
} from "@mui/material";

interface SubmitButtonProps {
  onClick: any;
  isLoading: boolean;
  buttonStyles?: ButtonProps;
  circularProgressStyles?: CircularProgressProps;
  buttonlabel: string;
}
export const SubmitButton = (props: SubmitButtonProps) =>
  props.isLoading ? (
    <CircularProgress {...props.circularProgressStyles} />
  ) : (
    <Button {...props.buttonStyles} onClick={props.onClick}>
      {props.buttonlabel}
    </Button>
  );
