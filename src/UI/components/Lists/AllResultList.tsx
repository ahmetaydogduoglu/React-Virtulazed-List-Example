import React, {  useEffect, useState } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
} from "react-virtualized";
//local flies
import "./AllResultList.css";
//components
import ScoreRow from "../ScoreRow";
import LeagueTitle from "../LeaguesTitle";
import ScoreList from "./List";

const Lists = ({
  data,
  setTopBarVisibility,
  topBarsVisibility,
}: {
  data: Array<any>;
  setTopBarVisibility: Function;
  topBarsVisibility: boolean;
}) => {
  const [scoreList, setScoreList] = useState<any>([]);
  const [leagueList, setLeagueList] = useState<any>([]);

  const cache = new CellMeasurerCache({
    defaultHeight: 35,
    fixedWidth: true,
  });

  function _rowRenderer({ index, parent, key, style }) {
    let findIndex = leagueList.findIndex((a) => a.order === index);
    return (
      <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={index}>
        {({ measure, registerChild }) => (
          <div ref={registerChild} style={style} onLoad={measure}>
            {findIndex !== -1 && (
              <LeagueTitle
                eventType={leagueList[findIndex].eventType}
                leagueName={leagueList[findIndex].leagueName}
                countryName={leagueList[findIndex].countryName}
              />
            )}
            <ScoreRow content={scoreList[index]} key={index} />
          </div>
        )}
      </CellMeasurer>
    );
  }

  useEffect(() => {
    let tempArray: Array<any> = [];
    let leagueList: Array<{
      leagueName: string;
      countryName: string;
      order: number;
      eventType: number;
    }> = [];
    data.forEach((item) => {
      leagueList.push({
        leagueName: item.leagueName,
        countryName: item.countryName,
        eventType: item.eventType,
        order: tempArray.length,
      });
      tempArray = tempArray.concat(item.scores);
    });
    setLeagueList(leagueList);
    setScoreList(tempArray);
  }, [data[0]]);

  //scrollevent
  let lastScrollTop: number = 0;
  const onScrollList = ({
    scrollTop,
  }: {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }) => {
    const scrollTopHeight: number = scrollTop;
    if (scrollTopHeight > 100) {
      setTopBarVisibility(true);
    } else {
      setTopBarVisibility(false);
    }
    lastScrollTop = scrollTopHeight >= 0 ? scrollTopHeight + 1 : 0;
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <ScoreList
          size={{ width, height }}
          onScrollList={onScrollList}
          cache={cache}
          data={scoreList}
          rowRenderer={_rowRenderer}
        />
      )}
    </AutoSizer>
  );
};

export default Lists;
