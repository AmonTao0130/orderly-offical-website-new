import { stringify } from "qs";
interface Props {
  endpoint: string;
  query?: Record<string, any>;
  wrappedByKey?: string;
}

const STRAPI_URL = "https://exuberant-sparkle-dc686d5c20.strapiapp.com";
const API_TOKEN =
  "91c7076e83d724cfa4a5f572a12675b54b2fbadd69e162a47a624d01a47ecfe4dcff61e845197917cee68b5dbb5a4abe3f1899568a75ccd67feb616bd750d3482cce93f44c52339a7913040c2ba3ce280a653f8e9490ce673dab7168d9016534f956241f5e11caaa20a7769e7b885d27b3b66fff5da864b00189713707bdd481";

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
}: Props): Promise<T> {
  // const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  const _query = stringify(query, { encodeValuesOnly: true });

  const url = `${STRAPI_URL}/api/${endpoint}?${_query}`;
  // console.log("url", url);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `bearer ${API_TOKEN}` },
  });
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  return data as T;
}
