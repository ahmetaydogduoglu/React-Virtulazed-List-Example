import { getMethod } from "../API/methods";
export default function getAllResults(endpoint: string): Promise<any> {
  return getMethod(endpoint, "");
}
