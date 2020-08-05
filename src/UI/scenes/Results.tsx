import React, { useEffect, useState } from "react";
//components
import TabNavigator from "../components/TabNavigator/Tab";
import EventTypesBar from "../components/eventTypeBar/TypeBar";
import Loading from "../components/loadings/resultsLoading";
import ScoreList from "../components/Lists/AllResultList";
import SearchBox from "../components/SearchBox/SearchBox";

//services
import getAllResults from "../../services/getAllResults";
//listener
import SearchBoxListener from "../../searchBoxListen/SearchBoxListen";
import listenBranchChange from "../../branchChange/BranchChangeListen";
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
      .then((results: any) => {
        if (Object.keys(results).length === 0) {
          alert("Hiç Sonuç Yok.");
        } else {
          setAllResults(results.groupedData);
          // event types sort
          setEventTypes(results.eventTypeList);
          setSelectedEventType(results.eventTypeList[0]);
          findEventScores(results.groupedData, results.eventTypeList, 0);
          listenBranchChange.setBranches({
            branches: results.eventTypeList,
            selectedBranches: results.eventTypeList[0].eventType,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        alert("Bir Sorun Oluştu");
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

  useEffect(() => {
    listenBranchChange
      .getBranchesContent()
      .subscribe(
        (content: { branches: Array<any>; selectedBranches: number }) => {
          if (content.branches) {
            const findEventIndex = content.branches.findIndex(
              (item) => parseInt(item.eventType) === content.selectedBranches
            );
            if (findEventIndex !== -1) {
              setSelectedEventType(content.branches[findEventIndex]);
              findEventScores(allResults, content.branches, findEventIndex);
            }
          } else {
            listenBranchChange.clearBranches();
          }
        }
      );
  }, [allResults]);

  const findEventScores = (
    allResultObject: Object,
    types: Array<any>,
    selectedEvent: number
  ) => {
    let scoreList: Array<any> = [];
    Object.keys(allResultObject).forEach((key) => {
      const keys = key.split("-");
      if (keys[0] === types[selectedEvent].eventType.toString()) {
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
        <EventTypesBar
          events={eventTypes}
          selectedEventTypes={selectedEventType}
        />
        <SearchBox searchBoxListener={searchBoxListen} />
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
