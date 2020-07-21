import React from "react";
import "./resultsLoading.css"
export default function resultsLoading({ message }: { message: string }) {
  return (
    <div className="loading-container">
      <p>{message}</p>
    </div>
  );
}
