import React from "react";
//local file
import "./ScoreRow.css";
import moment from "moment";

export default function rowRenderer({ content }: { content: any }) {
  const fullTimeScore = content.detail.find((a) => a.part_number === "FT");
  return (
    <div className="score-row-container">
      <div className="event-hour-container">
        <p className="event-hour-text">
          {moment(content.eventDate).format("HH:MM")}
        </p>
      </div>
      <div className="teams-content-container">
        <p
          className={
            fullTimeScore.home_score > fullTimeScore.away_score
              ? "team-name-text winner-team-text"
              : "team-name-text"
          }
        >
          {content.homeTeamName}
        </p>
        <p className="full-time-score-text">{fullTimeScore.home_score}-{fullTimeScore.away_score}</p>
        <p
          className={
            fullTimeScore.home_score < fullTimeScore.away_score
              ? "team-name-text right winner-team-text"
              : "team-name-text right"
          }
        >
          {content.awayTeamName}
        </p>
      </div>
    </div>
  );
}
