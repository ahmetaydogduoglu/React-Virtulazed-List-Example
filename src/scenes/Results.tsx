import React, { useEffect, useState } from "react";
//components
import TabNavigator from "../components/TabNavigator/Tab";
import EventTypesBar from "../components/eventTypeBar/TypeBar";
import Loading from "../components/loadings/resultsLoading";
import ScoreList from "../components/Lists/AllResultList";
import SearchBox from "../components/SearchBox/SearchBox";

//services
import getAllResults from "../services/getAllResults";
//groupMethods
import eventGroupMethod from "../GroupMethods/eventMethod";
import eventTypeMethod from "../GroupMethods/eventTypesMethod";
//listener
import SearchBoxListener from "../searchBoxListen/SearchBoxListen";
//local file
import "./Results.css";

const searchBoxListen = new SearchBoxListener();

const LiveResults = () => {
  const [allResults, setAllResults] = useState([]);
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedEventType, setSelectedEventType] = useState<Object>({});
  const [topBarsVisibility, setTopBarVisibility] = useState(true);
  
  const onGetAllResults = () => {
    setLoading(true);
    getAllResults("/score-list")
      .then((results) => {
        let eventTypes: Array<any> = [];
        let groupData: any = {};
        if (results.liveScores.length !== 0) {
          //events group
          groupData = eventGroupMethod(results);
          setAllResults(groupData);
          //eventTypesGroup
          eventTypes = eventTypeMethod(groupData);
        }
        //event types sort
        eventTypes = eventTypes.sort(
          (a, b) => parseInt(a.eventType) - parseInt(b.eventType)
        );
        setEventTypes(eventTypes);
        setSelectedEventType(eventTypes[0]);
        findEventScores(groupData, eventTypes, 0);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  //search with team name
  const searchTeamName = (teamName, scoreList) => {
    let filterResult: Array<any> = [];
    const lowerTeamName = teamName.toLowerCase();
    scoreList.forEach((item) => {
      const searchResult = item.scores.filter(
        (a) =>
          a.homeTeamName.toLowerCase().includes(lowerTeamName) ||
          a.awayTeamName.toLowerCase().includes(lowerTeamName)
      );
      if (searchResult.length > 0) {
        filterResult.push({
          ...item,
          scores: searchResult,
        });
      }
    });
    setResults(filterResult);
  };

  useEffect(() => {
    searchBoxListen.getMessage().subscribe((message) => {
      setSearchText(message.text);
    });
  }, []);

  useEffect(() => {
    onGetAllResults();
  }, []);

  //searchMethod
  useEffect(() => {
    if (searchText.trim().length > 2) {
      const tempLiveResult = [...results];
      searchTeamName(searchText, tempLiveResult);
    } else {
      const findEventIndex = eventTypes.findIndex(
        (item) => item === selectedEventType
      );
      findEventScores(allResults, eventTypes, findEventIndex);
    }
  }, [searchText]);

  const selectEventTypes = (types) => {
    const findEventIndex = eventTypes.findIndex(
      (item) => item.eventType === types
    );
    setSelectedEventType(eventTypes[findEventIndex]);
    findEventScores(allResults, eventTypes, findEventIndex);
  };

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
      setResults(scoreList);
    }
  };

  return (
    <div className={"all-result-container"}>
      <div className={"top-container-all"}>
        {loading && <Loading message="Sonuçlar Yükleniyor" />}
        <TabNavigator visible={true} />
        <SearchBox searchBoxListener={searchBoxListen} />
        <EventTypesBar
          events={eventTypes}
          selectedEventTypes={selectedEventType}
          selectEventType={selectEventTypes}
        />
      </div>
      {!loading && (
        <ScoreList
          setTopBarVisibility={setTopBarVisibility}
          data={results}
          topBarsVisibility={topBarsVisibility}
        />
      )}
    </div>
  );
};

export default LiveResults;
