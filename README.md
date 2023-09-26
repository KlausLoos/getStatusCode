# Google Apps Script: HTTP Status Code and Final URL Checker

## Overview

This Google Apps Script is designed to work with Google Sheets. It provides a custom function `getStatusCode(url)` that returns the HTTP status code and the final URL after following any redirects for a given URL.

## Features

- Retrieves the HTTP status code for a given URL.
- Follows any 301 or 302 redirects to find the final URL.
- Caches the results for 1 minute to improve performance for repeated URLs.

## Usage

### In Google Sheets

1. Open a Google Sheet.
2. Go to `Extensions` -> `Apps Script` to open the script editor.
3. Paste the code into the script editor and save.

Now you can use `=getStatusCode("http://example.com")` in your Google Sheet to get the HTTP status code and the final URL.

### Function Signature

```javascript
/**
 * @param {string} url The URL to check. This should be a valid URL starting with "http://" or "https://".
 * @return {string} A string with the status code and, if there was a redirect, the final URL in the format "301 - {final url}".
 */
function getStatusCode(url);
```

### Example
`=getStatusCode("http://example.com")` might return 301 - https://www.example.com.

### Limitations
The script uses Google Apps Script's UrlFetchApp service, which has its own quotas and limitations.

### Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
