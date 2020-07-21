import React from "react";
import Link from "react-router-dom/Link";
import { useLocation } from "react-router-dom";
//local files
import "./TabLinks.css";

export default function TabLinks({
  pathName,
  name,
}: {
  pathName: string;
  name: string;
}) {
  const location = useLocation();
  return (
    <Link className="link-button-shell" to={pathName}>
      <button
        className={
          location.pathname === pathName ? "link-button active" : "link-button"
        }
      >
        {name}
      </button>
    </Link>
  );
}
