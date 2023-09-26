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
  var response = UrlFetchApp.fetch(url_trimmed, options);
  var status = response.getResponseCode();
  
  var result = status;
  // If status is 301 or 302, follow the redirect and get the final URL
  if (status === 301 || status === 302) {
    options.followRedirects = true;
    response = UrlFetchApp.fetch(url_trimmed, options);
    var finalUrl = response.getHeaders().Location || url_trimmed;
    result = status + " - " + finalUrl;
  }
  
  // Store the result in the cache for 6 hours
  cache.put(url, result.toString(), 21600);
  
  return result;
}
