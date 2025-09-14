// Force PDF Inline - background service worker (MV3)
// First attempt at intercepting PDF responses.

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const headers = details.responseHeaders || [];
    for (let i = 0; i < headers.length; i++) {
      const h = headers[i];
      if (h.name.toLowerCase() === "content-disposition" &&
          h.value.toLowerCase().startsWith("attachment")) {
        console.log("[Force PDF Inline] Changing header for", details.url);
        // Replace only the disposition token; preserve any existing parameters (e.g., filename, filename*)
        // Example: "attachment; filename=foo.pdf" -> "inline; filename=foo.pdf"
        headers[i].value = "inline" + h.value.slice(10);
      }
    }
    return { responseHeaders: headers };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders", "extraHeaders"]
);

console.log("Force PDF Inline service worker active.");
