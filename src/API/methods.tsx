import callFetch from "./callFetch";

export const getMethod = (endPoint, params: string): Promise<any> => {
  return callFetch(endPoint, "GET", params);
};
