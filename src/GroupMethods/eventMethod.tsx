type Idata = {
  liveScores: Array<any>;
};

export default (data: Idata) => {
  return data.liveScores.reduce(function (
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
    return obj;
  },
  {});
};
