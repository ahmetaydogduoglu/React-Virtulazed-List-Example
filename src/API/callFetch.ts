import { apiUrl } from "../constants/apiUrl";
import LinkedList from "../linkedList/LinkedList";

interface responseInterface<T1, T2, T3, T4> {
  code: T1;
  liveScores: T2;
  message: T3;
  status: T4;
}

export default (
  endpoint: string,
  method: string,
  param: string = "",
  body: any = null
) => {
  const doRequest = new Promise(function (resolve: any, reject: any) {
    const newLinkedList = new LinkedList();

    fetch(apiUrl + endpoint + param, {
      method,
      body,
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (
          response: responseInterface<number, Array<Object>, string, string>
        ) => {
          // const groupedScroes = groupScore(response);
          // let scoresEventList: Array<any> = [];
          // const sortedEvent = groupedScroes.eventTypeList.sort(
          //   (a, b) => parseInt(a.eventType) - parseInt(b.eventType)
          // );
          // sortedEvent.forEach((item, index) => {
          //   const result = Object.keys(groupedScroes.groupedData).filter(
          //     function (key) {
          //       const splitedKey = key.split("-");
          //       return splitedKey[0].toString() === item.eventType.toString();
          //     }
          //   );
          //   if (
          //     scoresEventList.findIndex(
          //       (event) =>
          //         event.eventType.toString() === item.eventType.toString()
          //     ) === -1
          //   ) {
          //     let scores: Array<Object> = [];
          //     result.forEach((key) => {
          //       scores.push(groupedScroes.groupedData[key]);
          //     });
          //     scoresEventList.push({
          //       ...item,
          //       scores,
          //     });
          //   }
          //   // newLinkedList.append(scoresEventList[index]);
          // });
          resolve(response);
        }
      )
      .catch((err) => reject(err));
  });
  return doRequest;
};
