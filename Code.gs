/**
 * Gets the HTTP status code and final URL after redirects for a given URL.
 * Caches results for 6 hours to improve performance for repeated URLs.
 *
 * @param {string} url The URL to check. This should be a valid URL starting with "http://" or "https://".
 * @return {string} A string with the status code and, if there was a redirect, the final URL in the format "301 - {final url}".
 * @customfunction
 */
function getStatusCode(url) {
  var cache = CacheService.getScriptCache();
  
  // Try to load the cached value
  var cached = cache.get(url);
  if (cached !== null) {
    return cached;
  }
  
  var options = {
    'muteHttpExceptions': true,
    'followRedirects': false
  };
  
  var url_trimmed = url.trim();
  var finalUrl = url_trimmed;
  var originalStatus = 0;
  var status = 0;
  
  // Manually follow redirects
  do {
    var response = UrlFetchApp.fetch(finalUrl, options);
    status = response.getResponseCode();
    
    // Store the original status code if it's a redirect
    if ((status === 301 || status === 302) && originalStatus === 0) {
      originalStatus = status;
    }
    
    if (status === 301 || status === 302) {
      finalUrl = response.getHeaders()['Location'];
    }
  } while (status === 301 || status === 302);
  
  var result = (originalStatus || status) + " - " + finalUrl;
  
  // Store the result in the cache for 1 min
  cache.put(url, result.toString(), 21600);
  
  return result;
}
