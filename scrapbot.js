const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const axios = require('axios');
const config = require('./config.json');
const { searchKillstreak } = require('./components/search.js');
const { getInventory, searchInvenRegex } = require('./components/inventory.js');
//const { getInventory } = require('./components/inventory.js');


require('dotenv').config();


const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
  steam: client,
  community: community,
  language: 'en'
});

const logOnOptions = {
  accountName: process.env.ACCNAME,
  password: process.env.ACCPW,
  twoFactorCode: SteamTotp.generateAuthCode(process.env.SSECRET)
};


client.logOn(logOnOptions);
client.on('webSession', function(sessionID, cookies) {

  client.setPersona(SteamUser.EPersonaState.Online);
  client.gamesPlayed(440);

  community.setCookies(cookies);

  var ks_list = '';
  var counter = 0;
  //let strangebots = ['tf2scrap46', 'tf2scrap47', 'tf2scrap48', 'tf2scrap49', 'oarwhat'];
  let searchIdArray = ['76561198134194828', '76561198134194028', '76561198134193428', '76561198134196177', '76561198135385228', '76561198135385428'];
  let invenRegexArray = [];

  searchIdArray.forEach(searchId => {getInventory(axios, searchId, (response) => {
    
    searchInvenRegex(response.data, "Killstreak", invenRegexArray);
    counter = counter++;
    if(counter == searchIdArray.length){
      console.log(invenRegexArray)
    }
    
    });
  });

});









