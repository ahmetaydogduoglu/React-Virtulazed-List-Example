import React from "react";
//local files
import "./TypeBar.css";
//components
import TypeBarButton from "./TypeBarButton";
export default function TypeBar({ events,selectEventType,selectedEventTypes }: { events: Array<Object>,selectEventType:Function,selectedEventTypes:Object }) {
  return (
    <div className="type-bar-container">
      {events.map((item: any,index:number)=> (
        <TypeBarButton key={item.key} selectEventType={selectEventType} eventType={item} selectedEventTypes={selectedEventTypes} />
      ))}
      <div className="event-typeBar-hidden-container">.</div>
    </div>
  );
}
