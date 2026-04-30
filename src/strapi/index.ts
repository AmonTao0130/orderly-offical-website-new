import { stringify } from "qs";
import MockData from "./mock";
interface Props {
  endpoint: string;
  query?: Record<string, any>;
  wrappedByKey?: string;
  /** 为节省页面显示时间，部分 api 支持使用 mock 数据 */
  mock?: boolean;
}

const STRAPI_URL = "https://exuberant-sparkle-dc686d5c20.strapiapp.com";
const API_TOKEN =
  "b96d4058530204d45caed8c49c100219a14e2dbebda6d8f3c8060afd064520d30be8b00b015721335b22e10b2bbbd90bc905865c2784f7eddb7e10beb4662e4e962ba312f6506d79931884d1c53a5abcf1592783080ef741713c5055cd68c08ced411371cb2590e4aca7f2254f67741e6dc9b494c386e6b7b340510d9c4ba92b";

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from 需要获取的内容类型
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from 在响应中被拆封的键
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  mock,
}: Props): Promise<T> {
  // const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  const _query = stringify(query, { encodeValuesOnly: true });
  const path = `/api/${endpoint}?${_query}`;

  const url = `${STRAPI_URL}${path}`;
  // console.log("url", url);
  // console.log("endpoint", endpoint, query);

  let data: any;

  if (mock) {
    data = MockData[path];
  } else {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `bearer ${API_TOKEN}`,
        // Enable the retro-compatibility flag to receive the v4 response format
        // 先提前设置，后续升级到 v5 才不会导致线上有问题
        // https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes/new-response-format
        "Strapi-Response-Format": "v4",
      },
    });

    data = await res.json();
  }

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  return data as T;
}
