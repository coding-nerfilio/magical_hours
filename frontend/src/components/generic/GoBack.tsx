import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";

const GoBack = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  return (
    <IconButton onClick={handleClick} size="medium" sx={{ ml: 2 }}>
      <ArrowBack />
    </IconButton>
  );
};

export default GoBack;
