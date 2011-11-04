/*!
 * DuckDuckGo Search Client for Node.js
 * Copyright(c) 2011 Sujal Shah <sujal@variolabs.com>
 * Source covered by the MIT License
 * 
 * Portions from or inspired by the twitter-node library by
 * Jeff Waugh (https://github.com/jdub/node-twitter)
 * including the constructor/options storage
 *
 */
 
var request = require('request')
  , url = require('url')
  , querystring = require('querystring')
  , _ = require('underscore');
 
exports = module.exports;
 
var SearchClient = function(options)
{
  if (!(this instanceof SearchClient)) return new SearchClient(options);
 
  var defaults = {
    /*
     * output format (json or XML - defaults to json)
     * Required
     */
    format: "json"
    
    /*
     * pretty print json output
     */
    , prettyJson: false
    
    /*
     * use SSL
     * defaults to false
     */
    , useSSL: false
    
    /*
     * Set strict SSL mode
     */
    , strictSSL: false

    /*
     * Base URL for API, includes the question mark
     */
    , baseUrl: "http://api.duckduckgo.com/?"
    
    /*
     * SSL Base URL for API, includes the question mark
     */
    , sslBaseUrl: "https://api.duckduckgo.com/?"

    /*
     * Skip redirect for bang commands (defaults to true because 
     * it doesn't make sense for an API client like this to redirect - 
     * not really sure it should be an option)
     */
    , noRedirect: true

    /*
     * Remove HTML from text
     * defaults to false
     */
    , noHtml: false

    /*
     * Skip Disambiguation records in the response
     * Defaults to false
     */
    , skipDisambig: false
    
    /*
     * User Agent
     *
     */
    , userAgent: "DDG Search Client for Node.js ("+SearchClient.version+")"
     
  };
  
  if (options === null || typeof options !== 'object')
    options = {};
  
  // merge options passed in with defaults
  this.options = _.extend(defaults, options);

  
 
}

SearchClient.version = "0.0.1";
module.exports = SearchClient;

/*
 * search(query, options, callback)
 *
 * callback gets 3 arguments back, basically the responses from
 * the underlying request object, except that body is turned into objects
 */
SearchClient.prototype.search = function(query, options, callback) {
  
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }

  if ( typeof callback !== 'function' ) {
    throw "ERROR: Callback function required, was not present or of type function";
    return this;
  }

  var finalOptions = this.options;

  var arguments = {
    "q": query,
    "format": finalOptions.format,
    "no_html": (finalOptions.noHtml === true ? 1 : 0),
    "no_redirect": (finalOptions.noRedirect === true ? 1 : 0),
    "skip_disambig": (finalOptions.skipDisambig === true ? 1 : 0),
    "pretty": (finalOptions.prettyJson === true ? 1 : 0)
  };

  if (options !== null)
  {
    finalOptions = _.extend(this.options, options);
  }

  var finalBaseUrl = (finalOptions.useSSL) === true ? finalOptions.sslBaseUrl : finalOptions.baseUrl;
  
  request({
    uri: finalBaseUrl + querystring.stringify(arguments)
    , strictSSL: finalOptions.strictSSL
    , method: finalOptions.method || "GET"
    , headers: {
      "User-Agent": finalOptions.userAgent
      }
      , timeout: 2000
    }, function(error, response, body){
      if (!error && response.statusCode >= 200 && response.statusCode < 300)
      {
        // error could be in the body (DDG returns 200 for failed requests)
        if (body.length == 0)
        {
          error = new Error("DDG API Error: Empty response. Check your arguments for proper values: " + JSON.stringify(arguments));
        }
        callback(error, response, JSON.parse(body));
      } else {
      // probably should do something interesting here...
      callback(error, response, body);
      }
  });
  
}
