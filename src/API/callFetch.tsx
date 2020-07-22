import { apiUrl } from "../constants/apiUrl";
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
    fetch(apiUrl + endpoint + param, {
      method,
      body,
    })
      .then((repsonse) => {
        return repsonse.json();
      })
      .then(
        (
          response: responseInterface<number, Array<Object>, string, string>
        ) => {
          resolve(response);
        }
      )
      .catch((err) => reject(err));
  });
  return doRequest;
};
