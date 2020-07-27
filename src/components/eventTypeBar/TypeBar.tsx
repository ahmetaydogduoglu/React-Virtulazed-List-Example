import React, { useEffect, useState } from "react";
//local files
import "./TypeBar.css";
//components
import TypeBarButton from "./TypeBarButton";
//BranchChangeListen
import listenBranchChange from "../../BranchChange/BranchChangeListen";

interface IContent {
  branches: Array<Object>;
  selectedBranches: Number;
}

export default function TypeBar({
  events,
  selectedEventTypes,
}: {
  events: Array<Object>;
  selectedEventTypes: Object;
}) {
  const [branches, setBranches] = useState<Array<Object>>([]);
  const [selectedBranch, setSelectedBranch] = useState<Number>(0);
  useEffect(() => {
    listenBranchChange.getBranchesContent().subscribe((content: IContent) => {
      if (content.branches) {
        setBranches(content.branches);
        setSelectedBranch(content.selectedBranches);
      }else{
        listenBranchChange.clearBranches();
      }
    });      
  });
  const selectBranch = (branchType: number) => {
    listenBranchChange.setBranches({
      branches: branches,
      selectedBranches: branchType,
    });
  };
  return (
    <div className="type-bar-container">
      {branches[0] &&
        branches.map((item: any, index: number) => (
          <TypeBarButton
            key={index}
            selectEventType={selectBranch}
            eventType={item}
            selectedEventType={selectedBranch}
          />
        ))}

      <div className="event-typeBar-hidden-container">.</div>
    </div>
  );
}
