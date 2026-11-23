# Growth Bridge Advisory website

Responsive static website for GitHub Pages and `growthbridgeadvisory.com`. The contact form is connected to the Google Apps Script web-app endpoint supplied by the site owner and submits enquiry data as JSON.

## Included
- Responsive corporate website and supplied company logo
- Company services, delivery approach and commitments
- Contact form with name, work email, phone, company, service and message
- Google Apps Script submission integration
- Basic client-side validation and a honeypot field
- `CNAME` for `growthbridgeadvisory.com` and `.nojekyll`

## Publish/update on GitHub Pages
1. Extract this ZIP.
2. Copy the **contents** of `growthbridge-website` into the root of your local Git repository (the same folder containing `.git`).
3. Review the changed files with `git status`.
4. Commit and push to the `main` branch.
5. GitHub Pages should deploy automatically from `main` / root.

Example commands, when run from your Git repository root:

```bash
git add -A
git commit -m "Connect website enquiry form to Google Sheets"
git push origin main
```

Do not overwrite your `.git` folder. Keep the `CNAME` file containing exactly `growthbridgeadvisory.com`.

## Google Apps Script integration
The website posts JSON to the Apps Script `/exec` URL configured in `script.js`. The payload fields are:

- `name` (required)
- `email` (required)
- `phone` (optional)
- `company` (optional)
- `service` (required)
- `message` (required)
- `source`

The Apps Script `doPost(e)` must parse `JSON.parse(e.postData.contents)` and write these fields to the target spreadsheet. The deployed web app must be accessible to website visitors (typically **Execute as: Me** and **Who has access: Anyone**). If you change the Apps Script code, create a new deployment version or update the existing deployment so the `/exec` endpoint runs the latest version.

### Important response limitation
The browser sends the request in `no-cors` mode to avoid a cross-origin preflight. Browsers do not expose the Apps Script response body/status to this page, so the page can report that the request was dispatched but cannot independently verify that a row was written. After publishing, submit a test enquiry and confirm that it appears in the Google Sheet. For stronger delivery confirmation, add a same-origin server/proxy or redesign the Apps Script integration to use a verifiable response flow.

## Security and operations
- The Apps Script endpoint is public by design; validate and sanitize all fields in `doPost` before writing to the spreadsheet.
- Add server-side rate limiting or stronger bot protection before relying on the form for high-volume public traffic. A client-side honeypot is only a basic deterrent.
- Do not collect sensitive personal information in the public enquiry form.
- Restrict access to the Google Sheet to authorised business users.
- The website does not expose the spreadsheet ID or Google account credentials.

## Local preview
Open `index.html` in a browser. No build step is required. The live form sends to the configured Apps Script endpoint, so use a test enquiry only after checking the destination spreadsheet.
