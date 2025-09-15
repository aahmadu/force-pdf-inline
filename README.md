# Force PDF Inline

Small Chrome extension that ensures PDFs open in Chrome's built‑in viewer instead of downloading. It rewrites `Content-Disposition: attachment` to `inline` for responses that are actually `application/pdf`.

## Why
- Some sites force PDF downloads by sending `Content-Disposition: attachment`.
- This prevents previewing in Chrome’s PDF viewer and breaks in‑browser reading.
- This extension only touches real PDF responses and preserves any filename parameters.

## How it works
- Uses Manifest V3 `declarativeNetRequest` static rules, not blocking `webRequest`.
- Rule 1: Redirects requests like `...file.pdf?...forcedownload=1` to `...forcedownload=0`.
- Rule 2: Sets `Content-Disposition: inline` for `.pdf` responses to encourage in‑browser viewing.

## Install (Developer mode)
1. Download or clone this repository.
2. Visit `chrome://extensions` and enable Developer mode.
3. Click “Load unpacked” and select the repo folder.
4. Visit any link that normally downloads a PDF; it should open inline.

## Permissions
- `declarativeNetRequest`: to apply redirect and header rules.
- `host_permissions: <all_urls>`: required so rules apply wherever PDFs are served.

## Privacy
This extension does not collect, transmit, or store any personal data. See `PRIVACY.md` for details.

## Packaging for the Chrome Web Store
1. Ensure version in `manifest.json` is updated (`version` must increase for each submission).
2. Create a ZIP containing:
   - `manifest.json`
   - `background.js`
   - `icons/`
   - `README.md`, `PRIVACY.md`, `LICENSE` (optional for the bundle, but recommended in the repo)
3. Upload to the Chrome Web Store Developer Dashboard and fill in listing details:
   - Title: Force PDF Inline
   - Short description: “Open PDFs in Chrome’s viewer instead of downloading.”
   - Detailed description: Use content from this README.
   - Category: Productivity or Accessibility.
   - Screenshots: Include a screenshot of a PDF opening inline.
   - Privacy: “No data collected”.

### Build ZIP on Windows (PowerShell)
Run `./tools/build-zip.ps1` to create `dist/force-pdf-inline.zip` for upload.

## Notes and limitations
- Only modifies responses that declare `Content-Type: application/pdf`.
- If a server mislabels PDFs (e.g., `application/octet-stream`), Chrome might still download.
- Tested on current Chrome with Manifest V3 service worker background.

## License
MIT — see `LICENSE`.
