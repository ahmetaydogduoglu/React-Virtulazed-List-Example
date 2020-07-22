type Idata = {
  liveScores: Array<any>;
};
interface IeventTypeList {
  eventType: string;
  eventName: string;
  scoresLenght: number;
}
export default (data: Idata) => {
  const eventTypeList: Array<IeventTypeList> = [];
  const groupedData = data.liveScores.reduce(function (
    obj,
    { eventTypeName, eventType, leagueName, leagueCode, countryName, ...item }
  ) {
    const key = `${eventType}-${eventTypeName}-${leagueCode}-${countryName}`;
    obj[key] = obj[key] || {
      eventType,
      eventTypeName,
      leagueName,
      leagueCode,
      countryName,
      scores: [],
    };
    obj[key]["scores"].push(item);
    const findedIndex = eventTypeList.findIndex(
      (item) => item.eventType === eventType
    );
    if (findedIndex === -1) {
      eventTypeList.push({
        eventType: eventType,
        eventName: eventTypeName,
        scoresLenght: 1,
      });
    } else {
      eventTypeList[findedIndex].scoresLenght =
        eventTypeList[findedIndex].scoresLenght + 1;
    }
    return obj;
  },
  {});
  return {
    groupedData,
    eventTypeList,
  };
};
