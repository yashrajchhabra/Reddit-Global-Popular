function globalPopularUrl(rawUrl, baseUrl) {
  let url;
  try {
    url = new URL(rawUrl, baseUrl);
  } catch {
    return null;
  }

  if (
    !["http:", "https:"].includes(url.protocol) ||
    !/(^|\.)reddit\.com$/i.test(url.hostname) ||
    !/^\/r\/popular(?:\/|$)/.test(url.pathname)
  ) {
    return null;
  }

  const filters = url.searchParams.getAll("geo_filter");
  if (filters.length === 1 && filters[0] === "global") return null;

  url.searchParams.set("geo_filter", "global");
  return url.href;
}
