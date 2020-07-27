import React from "react";
import "./TypeBarButton.css";

type eventTypeTypes = {
  eventType: String;
  eventName: String;
  scoresLenght: Number;
};

export default function TypeBarButton({
  eventType,
  selectEventType,
  selectedEventType,
}: {
  eventType: eventTypeTypes;
  selectEventType: Function;
  selectedEventType: any;
}) {
  return (
    <button
      className={
        selectedEventType === eventType.eventType
          ? "type-bar-button activeTypes"
          : "type-bar-button"
      }
      onClick={() => selectEventType(eventType.eventType)}
    >
      {eventType.eventName[0].toUpperCase() + eventType.eventName.slice(1)} (
      {eventType.scoresLenght})
    </button>
  );
}
