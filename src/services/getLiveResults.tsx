import { getMethod } from "../API/methods";
export default function getLiveResult(endpoint: string): Promise<any> {
  return getMethod(endpoint, "");
}
