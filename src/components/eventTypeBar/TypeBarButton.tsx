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
  selectedEventTypes,
}: {
  eventType: eventTypeTypes;
  selectEventType: Function;
  selectedEventTypes: any;
}) {
  return (
    <button
      className={
        selectedEventTypes.eventType === eventType.eventType
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
