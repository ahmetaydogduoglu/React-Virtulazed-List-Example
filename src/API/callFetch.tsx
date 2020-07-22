import { apiUrl } from "../constants/apiUrl";
import LinkedList from "../LinkedList/LinkedList";
import groupScore from "../GroupMethods/eventMethod";

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
    for (let i = 0; i < 10; i++) {
      newLinkedList.append(`${i}.node`);
    }
    newLinkedList.toString();
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
          const groupedScroes = groupScore(response);
          console.log(groupedScroes)
          resolve(response);
        }
      )
      .catch((err) => reject(err));
  });
  return doRequest;
};
