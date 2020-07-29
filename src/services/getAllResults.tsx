import { getMethod } from "../API/methods";
import LinkedList from "../linkedList/LinkedList";
import AllScoresProperty from "../properties/AllScoresEventProperty";
import groupData from "../groupMethods/eventMethod";
interface responseProperty {
  liveScores: Array<any>;
  status: String;
  code: Number;
  message: String;
}

export default function getAllResults(endpoint: string): Promise<Object> {
  const getLiveResultPromise: Promise<Object> = new Promise(
    (resolve, reject) => {
      getMethod(endpoint, "")
        .then((response: responseProperty) => {
          const linkedList = new LinkedList();
          if (response.liveScores !== null) {
            response.liveScores.map((event) => {
              const eventProperty = new AllScoresProperty(event);
              linkedList.append(eventProperty);
            });
            const groupedDate = groupData(response);
            resolve(groupedDate);
          }
          resolve({})
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
  return getLiveResultPromise;
}
