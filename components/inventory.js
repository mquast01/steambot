
//const axios = require('../scrapbot.js');

function getInventory(axios, steamId, callback) {
    const inventoryUrl = "https://steamcommunity.com/profiles/" + steamId + "/inventory/json/440/2";
    axios.get(inventoryUrl)
        .then(function (response) {callback(response)})
        .catch(err => console.log("status error " + err.response.status + " | " + err.response.statusText))
}
function searchInvenRegex(inventory, stringRegex, matchArray) {
    let searchRegex = new RegExp(stringRegex);
    for(var key in inventory.rgDescriptions) { 
      var hashName = inventory.rgDescriptions[key].market_hash_name
      if(searchRegex.test(hashName)) {
        console.log(hashName)
        matchArray.push(hashName);
      }
    };
}

module.exports = { getInventory, searchInvenRegex };
