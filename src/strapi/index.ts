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
  "90b07807c51bb1864bd02cf4ade24da24de715601440e04e0194ab31ee1fa26ad0a1cbdb749a114c8440dc7fb113ff0899c9ca2a1a2ef5bf67b63b9aa5fe762d006f409adb0b0072028c4293b135b9411d5cb1900d698c3311cb4972696668b3258bf195dcc357fa331cea2ab118b17a97a9104d3d2ae2486faa234801e09f37";

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
  console.log("endpoint", endpoint, query);

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
