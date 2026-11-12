function updatePopularLink(anchor) {
  const original = anchor.getAttribute("href");
  if (!original) return;

  const updated = globalPopularUrl(original, location.href);
  if (!updated) return;

  // Keep root-relative links root-relative for Reddit's own navigation code.
  const url = new URL(updated);
  const href = original.startsWith("/") && !original.startsWith("//")
    ? url.pathname + url.search + url.hash
    : updated;
  anchor.setAttribute("href", href);
}

function updateLinksWithin(node) {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
  if (node.matches("a[href]")) updatePopularLink(node);
  node.querySelectorAll("a[href]").forEach(updatePopularLink);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes") {
      if (mutation.target instanceof HTMLAnchorElement) updatePopularLink(mutation.target);
    } else {
      mutation.addedNodes.forEach(updateLinksWithin);
    }
  }
});

observer.observe(document, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ["href"]
});
updateLinksWithin(document.documentElement);

// Catch a link if Reddit changes its href immediately before a click.
document.addEventListener("click", (event) => {
  const anchor = event.composedPath().find((node) => node instanceof HTMLAnchorElement);
  if (anchor) updatePopularLink(anchor);
}, true);
