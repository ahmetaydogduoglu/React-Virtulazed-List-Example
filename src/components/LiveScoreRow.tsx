import React from "react";
//local file
import "./ListRow.css";

export default function rowRenderer({ content }: { content: any }) {
  return (
    <div className="row-container">
      <div className="score-status-container">
        {content.playTime === null ? null : (
          <p className="play-time-text">{content.playTime}'</p>
        )}
        <p className="status-text">{content.status}</p>
      </div>
      <div className="teams-content-container">
        <p
          className={
            content.homeScore > content.awayScore
              ? "team-name-text winner-team-text"
              : "team-name-text"
          }
        >
          {content.homeTeamName}
        </p>
        <p className="score-text">{content.score}</p>
        <p
          className={
            content.homeScore < content.awayScore
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
