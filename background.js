// Force PDF Inline - background service worker (MV3)
// Refinement: only touch PDFs, preserve filenames more cleanly, better logs.

function isPdfResponse(headers) {
  for (const h of headers) {
    if (h.name.toLowerCase() === "content-type" &&
        h.value.toLowerCase().includes("application/pdf")) {
      return true;
    }
  }
  return false;
}

function rewriteContentDisposition(headers, url) {
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    if (h.name.toLowerCase() === "content-disposition" &&
        h.value.toLowerCase().startsWith("attachment")) {

      // Preserve any parameters (like filename=...)
      const parts = h.value.split(";");
      const rest = parts.slice(1).join(";");
      const newValue = "inline" + (rest ? ";" + rest.trim() : "");

      console.log("[Force PDF Inline] Rewriting header:", {
        url,
        from: h.value,
        to: newValue,
      });

      headers[i].value = newValue;
    }
  }
}

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const headers = details.responseHeaders || [];
    if (isPdfResponse(headers)) {
      rewriteContentDisposition(headers, details.url);
    }
    return { responseHeaders: headers };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders", "extraHeaders"]
);

console.log("Force PDF Inline service worker active (refined).");
