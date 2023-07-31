import { useNavigate } from "react-router-dom";
import MUIButton from "@mui/material/Button";

const Button = () => {
  const navigate = useNavigate();

  return (
    <MUIButton variant="contained" onClick={() => navigate("/rank")}>
      입장
    </MUIButton>
  );
};

export default Button;
