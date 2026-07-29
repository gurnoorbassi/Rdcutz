const GRAPH_VERSION = "v24.0";
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;
const FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";

async function readEdge(userId, token, edge, limit) {
  const url = new URL(`${GRAPH_BASE}/${userId}/${edge}`);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  const response = await fetch(url);
  if (!response.ok) return [];

  const payload = await response.json();
  return (payload.data || []).map((item) => ({
    id: item.id,
    caption: item.caption || (edge === "stories" ? "Instagram story" : "Instagram post"),
    mediaType: edge === "stories" ? "STORY" : item.media_type,
    mediaUrl: item.media_url || item.thumbnail_url || "",
    permalink: item.permalink || "https://www.instagram.com/rdcutz_/",
    timestamp: item.timestamp || ""
  }));
}

exports.handler = async () => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [] })
    };
  }

  const [posts, stories] = await Promise.all([
    readEdge(userId, token, "media", 12),
    readEdge(userId, token, "stories", 10)
  ]);

  const items = [...stories, ...posts]
    .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
    .slice(0, 12);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300"
    },
    body: JSON.stringify({ items })
  };
};
