import { useNavigate } from "react-router-dom";

const PlayButton = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/rank")}>입장</button>;
};

export default PlayButton;
