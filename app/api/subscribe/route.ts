import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PUBLICATION_ID = "pub_5d9014db-562a-4133-81da-397faa2bfcee";

function json(body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: NextRequest) {
  let body: { email?: string };

  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON in request body" }, 400);
  }

  const email = body.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Invalid email" }, 400);
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = DEFAULT_PUBLICATION_ID;

  if (!apiKey) {
    return json(
      {
        error: "Newsletter configuration missing. Please set BEEHIIV_API_KEY.",
      },
      500
    );
  }

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicationId,
        email,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return json(
      {
        error:
          (errorData as { message?: string; error?: string }).message ||
          (errorData as { message?: string; error?: string }).error ||
          "Subscribe failed",
      },
      response.status
    );
  }

  const data = await response.json().catch(() => ({}));
  return json({ success: true, data }, 200);
}
