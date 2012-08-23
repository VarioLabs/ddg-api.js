[![build status](https://secure.travis-ci.org/VarioLabs/ddg-api.js.png)](http://travis-ci.org/VarioLabs/ddg-api.js)
# DuckDuckGo Wrapper for Node.js

A very simple wrapper for the DuckDuckGo API (http://duckduckgo.com/api.html). Just simplifies an edge case error check and presents a simple way to set & reuse options.

Usage: 

    var ddg = require('ddg-api');
    var client = new ddg.SearchClient({useSSL: true});
    client.search("Apple Inc.", function(error, response, data) {

      if (!error && response.statusCode == 200)
      {
        console.log(data.Abstract);
      } else {
        console.log("ERROR! " + error + "/" + response.statusCode);
      }

    });
    
----

## Supported options:

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
    
## License

Provided under the The MIT License (MIT)
Copyright (c) 2011 Sujal Shah

See LICENSE for details
