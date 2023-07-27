import React, { useState } from "react";
import styled from "styled-components";
import ToolTip from "./ToolTip";

const SWin = styled.div`
  background-color: blue;
  border: 1px white solid;
  width: 35px;
`;
const SLose = styled.div`
  background-color: red;
  border: 1px white solid;
  width: 35px;
`;
const SDraw = styled.div`
  background-color: black;
  border: 1px white solid;
  color: white;
  width: 35px;
`;
const SNone = styled.div`
  background-color: gray;
  border: 1px white solid;
  width: 35px;
`;

const RecentGameItem = ({ result }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  let Component;
  switch (result.category) {
    case "win":
      Component = SWin;
      break;
    case "lose":
      Component = SLose;
      break;
    case "draw":
      Component = SDraw;
      break;
    default:
      Component = SNone;
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {showTooltip && <ToolTip game={result} />}
      <Component>{result.category}</Component>
    </div>
  );
};

export default RecentGameItem;
