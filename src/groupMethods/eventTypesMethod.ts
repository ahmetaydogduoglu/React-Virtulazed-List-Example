export default (groupData: Object) => {
  let eventTypes: Array<any> = [];
  Object.keys(groupData).forEach((key) => {
    //keyleri ayır
    const keys = key.split("-");
    //spor dalllarını bul
    const keyIndex = eventTypes.findIndex((i) => i.eventType === keys[0]);
    if (keyIndex !== -1) {
      eventTypes[keyIndex].eventTypeCount += groupData[key]["scores"].length;
    } else {
      eventTypes.push({
        eventType: keys[0],
        eventName: keys[1],
        key: key,
        eventTypeCount: groupData[key]["scores"].length,
      });
    }
  });
  return eventTypes;
};
