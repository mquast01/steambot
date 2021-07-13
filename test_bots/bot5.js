const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const config = require('../config.json');

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
    steam: client,
    community: community,
    language: 'en'
});

const logOnOptions = {
  accountName: config.username,
  password: config.password,
  twoFactorCode: SteamTotp.generateAuthCode(config.sharedsecret)
};

client.logOn(logOnOptions);
client.on('webSession', (sessionid, cookies) => {
    console.log('Logged into Steam');
    client.setPersona(SteamUser.EPersonaState.Online);
    //client.gamesPlayed(440);

    manager.setCookies(cookies);

    community.setCookies(cookies);
    community.startConfirmationChecker(10000, config.identitysecret);
});

client.on('friendRelationship', (steamid, relationship) => {
    if (relationship === 2) {
        client.addFriend(steamid);
        client.chatMessage(steamid, 'Hello there! Thanks for adding me!');
      }
});


function getValue(items){
    var value;
    for (i = 0; i < items.length; i++) {   
        console.log(items[i].classid);
    }
    return 1;
};

manager.on('newOffer', offer => {
    
    //classid
    // ref = 2674
    // rec = 5564
    // scrap = 2675

    //
    var receiveValue = getValue(offer.itemsToReceive);
    var giveValue = getValue(offer.itemsToGive);

    
    
});