import { apiUrl } from "../constants/apiUrl";
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
        resolve(repsonse.json());
      })
      .catch((err) => reject(err));
  });
  return doRequest;
};
