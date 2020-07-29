import React, { useEffect } from "react";
//localFiles
import "./LeaguesTitle.css";
//icons
import SelectIcon from "../Icons/SelectIcon";
type leagueTitleType = {
  leagueName: String;
  countryName: String;
  eventType: number;
};

function LeaguesTitle({ leagueName, countryName, eventType }: leagueTitleType) {
  // const Icon = selectIcon(eventType);
  const Icon = SelectIcon(eventType)
  return (
    <div className="league-title-container">
      <Icon />
      <p>
        {countryName} - {leagueName}
      </p>
    </div>
  );
}

export default LeaguesTitle;
