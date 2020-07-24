import { getMethod } from "../API/methods";
import LinkedList from "../LinkedList/LinkedList";
import LiveEventProperty from "../properties/LiveEventProperty";
import groupData from "../GroupMethods/eventMethod";

interface responseProperty {
  liveScores: Array<any>;
  status: String;
  code: Number;
  message: String;
}
export default function getLiveResult(endpoint: string): Promise<Object> {
  const getLiveResultPromise: Promise<Object> = new Promise(
    (resolve, reject) => {
      getMethod(endpoint, "")
        .then((response: responseProperty) => {
          const linkedList = new LinkedList();
          console.log(response);
          response.liveScores.map((event) => {
            const eventProperty = new LiveEventProperty(event);
            linkedList.append(eventProperty);
          });
          const groupedDate = groupData(response);
          resolve(groupedDate);
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
  return getLiveResultPromise;
}
