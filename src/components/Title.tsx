import React from "react";
import { useNavigate } from "react-router-dom";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { Typography } from "@mui/material";

interface TitleProps {
  title?: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <WestRoundedIcon
        onClick={handleBackClick}
        style={{ cursor: "pointer", marginRight: "10px" }}
      />
      <Typography variant="h5" className="title">
        {title}
      </Typography>
    </div>
  );
};

export default Title;
