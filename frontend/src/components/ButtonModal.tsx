import { Box, Button, ButtonProps, Dialog, DialogProps } from "@mui/material";
import { useState } from "preact/hooks";

interface ButtonModalProps {
  children: any;
  label: any;
  buttonSx?: ButtonProps["sx"];
  dialogSx?: DialogProps["sx"];
  onClose?: () => any;
}

export const ButtonModal = (props: ButtonModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    if (props.onClose) props.onClose();
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            width: "fit-content",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "end", justifyContent: "end" }}
          >
            <Button onClick={handleClose}>X</Button>
          </Box>
          <Box sx={{ height: "20vh", width: "20vw", ...props.dialogSx }}>
            {props.children}
          </Box>
        </Box>
      </Dialog>
      <Button onClick={() => setIsOpen(true)} sx={{ ...props.buttonSx }}>
        {props.label}
      </Button>
    </>
  );
};
