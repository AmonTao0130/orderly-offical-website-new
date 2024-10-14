export const prerender = false;

import type { APIRoute } from "astro";
import axios from "axios";

const APIKey =
  "g7YBUkesN05QJCnKUortBCu5LQx2jCQ9MUC9M1x2gj5zK9ZJzIsoeaLCUCZcX8LG";

// API v1
const pubV1Id = "5d9014db-562a-4133-81da-397faa2bfcee";

// API v2
const pubV2Id = "pub_5d9014db-562a-4133-81da-397faa2bfcee";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const res = await axios.post(
    `https://api.beehiiv.com/v2/publications/${pubV2Id}/subscriptions`,
    {
      publicationId: pubV2Id,
      email: body.email,
    },
    {
      headers: {
        Authorization: `Bearer ${APIKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return new Response(JSON.stringify(res.data));
};
