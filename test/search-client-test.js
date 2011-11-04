var ddg = require('../lib/ddg-api');
var client = new ddg.SearchClient();
client.search("Apple Inc.", function(error, response, data) {
  
  if (!error && response.statusCode == 200)
  {
    console.log("SUCCESS: Found Abstract of length: " + data.Abstract.length);
  } else {
    console.log("ERROR! " + error + "/" + response.statusCode);
  }
  
});