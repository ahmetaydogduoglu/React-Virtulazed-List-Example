import React from "react";
import { FaFutbol, FaBasketballBall, FaVolleyballBall } from "react-icons/fa";

function selectIcon(key) {
  let icon: any = null;
  console.log(key);
  switch (parseInt(key)) {
    case 1:
      icon = <FaFutbol size={18} />;
      break;
    case 2:
      icon = <FaBasketballBall size={18} />;
    default:
      break;
  }
  return icon;
}

export default selectIcon;
