import React from "react";
import {
  FaFutbol,
  FaBasketballBall,
  FaTableTennis,
  FaMouse,
  FaHockeyPuck,
} from "react-icons/fa";

function SelectIcon(key: number) {
  switch (key) {
    case 1:
      return () => <FaFutbol size={14} />;
    case 2:
      return () => <FaBasketballBall size={14} />;
    case 20:
      return () => <FaTableTennis size={14} />;
    case 4:
      return () => <FaHockeyPuck size={14} />;
    case 110:
    case 111:
    case 118:
    case 109:
      return () => <FaMouse size={14} />;
    default:
      return () => <FaTableTennis size={14} />;
  }
}

export default SelectIcon;
