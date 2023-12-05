interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

const STRAPI_URL = "https://exuberant-sparkle-dc686d5c20.strapiapp.com";
const API_TOKEN =
  "bf447d96c2b519d815542ab0f8b6cc446d1bc67539e3c1d5cba4d1c659b91fcfb49435fb20cd5560635179dac2b75b3205c28484d12023fd7cb0e769102f249bb6f3adce9c8eb9b1eefecebe03e56f24f9b5cc86baf40437b162bb9e125357a78714d140b4e4814e5be665342ed4c98924cc97435298dda0b78de209e310b09b";

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from 需要获取的内容类型
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from 在响应中被拆封的键
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  // const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  // console.log("fetchApi =>", url.toString());
  const res = await fetch(url.toString(), {
    headers: { Authorization: `bearer ${API_TOKEN}` },
  });
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}
