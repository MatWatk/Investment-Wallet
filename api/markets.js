export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing COINGECKO_API_KEY" });
  }

  const ids = typeof req.query.ids === "string" ? req.query.ids : "";
  const vsCurrency = typeof req.query.vs_currency === "string" ? req.query.vs_currency : "usd";

  if (!ids) {
    return res.status(400).json({ error: "Missing required query param: ids" });
  }

  const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
  url.searchParams.set("vs_currency", vsCurrency);
  url.searchParams.set("ids", ids);
  url.searchParams.set("price_change_percentage", "24h,30d");
  url.searchParams.set("blockchain_site", "true");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": apiKey,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: "CoinGecko request failed",
        details: data,
      });
    }

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch market data" });
  }
}
