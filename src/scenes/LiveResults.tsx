import React, { useEffect, useState } from "react";
//components
import TabNavigator from "../components/TabNavigator/Tab";
import EventTypesBar from "../components/eventTypeBar/TypeBar";
import Loading from "../components/loadings/resultsLoading";
import Lists from "../components/Lists/LiveResultsList";
import SearchBox from "../components/SearchBox/SearchBox";
import FilterBar from "../components/LiveScoreFilterBar/FilterBar";
//local file
import "./LiveResults.css";
//services
import getLiveResult from "../services/getLiveResults";
//listener
import SearchBoxListener from "../searchBoxListen/SearchBoxListen";
//groupMethods
import eventGroupMethod from "../GroupMethods/eventMethod";
import eventTypeMethod from "../GroupMethods/eventTypesMethod";
//object for searchbox listener
const searchBoxListen = new SearchBoxListener();

const LiveResults = () => {
  //states
  const [liveResults, setLiveResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [allLiveResult, setAllLiveResult] = useState({});
  const [selectedEventType, setSelectedEventType] = useState<Object>({});
  const [topBarsVisibility, setTopBarVisibility] = useState(true);

  const onGetLiveResults = () => {
    setLoading(true);
    getLiveResult("/get-live-event-scores")
      .then((result) => {
        let eventTypes: Array<any> = [];
        let groupData: any = {};
        // if (result.liveScores.length !== 0) {
        //   //events group
        //   groupData = eventGroupMethod(result);
        //   setAllLiveResult(groupData);
        //   //eventTypesGroup
        //   eventTypes = eventTypeMethod(groupData);
        // }
        //event types sort
        eventTypes = eventTypes.sort(
          (a, b) => parseInt(a.eventType) - parseInt(b.eventType)
        );
        // setEventTypes(eventTypes);
        // setSelectedEventType(eventTypes[0]);
        // findEventScores(groupData, eventTypes, 0);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  //selected event scores find
  const findEventScores = (
    allResultObject: Object,
    types: Array<any>,
    selectedEvent: number
  ) => {
    let scoreList: Array<any> = [];
    Object.keys(allResultObject).forEach((key) => {
      const keys = key.split("-");
      if (keys[0] === types[selectedEvent].eventType) {
        scoreList.push(allResultObject[key]);
      }
    });
    if (searchText.trim().length > 2) {
      searchTeamName(searchText, scoreList);
    } else {
      setLiveResults(scoreList);
    }
  };

  //event typse select with typeBar
  const selectEventTypes = (types) => {
    const findEventIndex = eventTypes.findIndex(
      (item) => item.eventType === types
    );
    setSelectedEventType(eventTypes[findEventIndex]);
    findEventScores(allLiveResult, eventTypes, findEventIndex);
  };

  //search with team name
  const searchTeamName = (teamName, scoreList) => {
    let filterResult: Array<any> = [];
    scoreList.forEach((item) => {
      const searchResult = item.scores.filter(
        (a) =>
          a.homeTeamName.toLowerCase().includes(teamName.toLowerCase()) ||
          a.awayTeamName.toLowerCase().includes(teamName.toLowerCase())
      );
      if (searchResult.length > 0) {
        filterResult.push({
          ...item,
          scores: searchResult,
        });
      }
    });
    setLiveResults(filterResult);
  };

  useEffect(() => {
    searchBoxListen.getMessage().subscribe((message) => {
      if (message) {
        setSearchText(message.text);
      } else {
        searchBoxListen.clearMessage();
      }
    });
  }, []);

  //get data with fetch api
  useEffect(() => {
    onGetLiveResults();
  }, []);

  //searchMethod
  useEffect(() => {
    if (searchText.trim().length > 2) {
      const tempLiveResult = [...liveResults];
      searchTeamName(searchText, tempLiveResult);
    } else {
      const findEventIndex = eventTypes.findIndex(
        (item) => item === selectedEventType
      );
      findEventScores(allLiveResult, eventTypes, findEventIndex);
    }
  }, [searchText]);
  return (
    <div className={"live-results-container"}>
      {liveResults !== null && !loading ? (
        <Lists
          data={liveResults}
          setTopBarVisibility={setTopBarVisibility}
          topBarsVisibility={topBarsVisibility}
        />
      ) : null}
      <div className={"top-container"}>
        {loading && <Loading message="Canlı Sonuçlar Yükleniyor" />}
        <TabNavigator visible={true} />
        <SearchBox searchBoxListener={searchBoxListen} />
        <EventTypesBar
          events={eventTypes}
          selectEventType={selectEventTypes}
          selectedEventTypes={selectedEventType}
        />
      </div>
    </div>
  );
};

export default LiveResults;
