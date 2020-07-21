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
import EmptyList from "../EmptyList";

const Lists = ({ data }: { data: Array<any> }) => {
  const [scoreList, setScoreList] = useState<any>([]);
  const [leagueList, setLeagueList] = useState<any>([]);

  const listRef: any = useRef(null);
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
    listRef.current.recomputeRowHeights(1);
  }, [data[0]]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          height={height}
          ref={listRef}
          width={width}
          rowCount={scoreList.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          noRowsRenderer={EmptyList}
          rowRenderer={_rowRenderer}
        />
      )}
    </AutoSizer>
  );
};

export default Lists;
