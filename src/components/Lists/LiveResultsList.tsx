import React, { useRef, useEffect, useState } from "react";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
//components
import ScoreRow from "../LiveScoreRow";
import LeagueTitle from "../LeaguesTitle";
import ScoreList from "../Lists/List";

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
    defaultHeight: 18,
    fixedWidth: true,
  });

  function _rowRenderer({ index, parent, key, style }) {
    let content: any = scoreList[index];
    let findIndex = leagueList.findIndex((a) => a.order === index);
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }) => (
          <div
            ref={registerChild}
            className="live-result-container"
            style={{ ...style }}
            onLoad={measure}
          >
            {findIndex !== -1 && (
              <LeagueTitle
                eventType={leagueList[findIndex].eventType}
                leagueName={leagueList[findIndex].leagueName}
                countryName={leagueList[findIndex].countryName}
              />
            )}
            <ScoreRow content={content} key={index} />
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
        order: tempArray.length,
        eventType: item.eventType,
      });
      tempArray = tempArray.concat(item.scores);
    });
    setLeagueList(leagueList);
    setScoreList(tempArray);
    cache.clearAll(1);
  }, [data[0]]);

  let lastScrollTop = 0;
  const onScrollList = ({
    scrollTop,
  }: {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }) => {
    const scrollTopHeight: number = scrollTop;
    if (scrollTopHeight < lastScrollTop) {
      console.log("truuuuuuu");
      setTopBarVisibility(true);
    } else {
      console.log("falseeeee");
      setTopBarVisibility(false);
    }
    lastScrollTop = scrollTopHeight >= 0 ? scrollTopHeight : 0;
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
       
        <ScoreList
          cache={cache}
          data={scoreList}
          onScrollList={onScrollList}
          rowRenderer={_rowRenderer}
          size={{ width, height }}
        />
      )}
    </AutoSizer>
  );
};

export default Lists;
