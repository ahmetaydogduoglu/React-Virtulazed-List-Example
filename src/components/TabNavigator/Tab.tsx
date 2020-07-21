//global
import React from "react";
//local files
import "./Tab.css";
//components
import TabLink from "./TabLinks";

//props Types
type tabProps = {
  visible: boolean;
};

export default function Tab({ visible }: tabProps) {
  return (
    <div className={"tab-container"}>
      <TabLink pathName="/sonuclar/canliSonuclar" name="Canlı Sonuçlar" />
      <TabLink pathName="/sonuclar" name="Sonuçlar" />
    </div>
  );
}
