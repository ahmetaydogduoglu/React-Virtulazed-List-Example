import React, { useRef, useEffect } from "react";
import { List } from "react-virtualized";
//components
import EmptyList from "../EmptyList";
type listTypes = {
  data: Array<Object>;
  cache: any;
  rowRenderer: Function;
  onScrollList: Function;
  size: { width: number; height: number };
};

const ScoreList = ({
  size,
  data,
  cache,
  rowRenderer,
  onScrollList,
}: listTypes) => {
  const listRef: any = useRef(null);
  useEffect(() => {
    listRef.current.recomputeRowHeights(1);
    listRef.current.scrollToRow(0);
  }, [data[0]]);

  return (
    <List
      height={size.height}
      ref={listRef}
      width={size.width}
      rowCount={data.length}
      onScroll={onScrollList}
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      noRowsRenderer={EmptyList}
      rowRenderer={rowRenderer}
      overscanRowCount={3}
    />
  );
};

export default ScoreList;
