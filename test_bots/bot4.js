//accept donation

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

manager.on('newOffer', offer => {
    if (offer.itemsToGive.length === 0) {
        offer.accept((err,status) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Donation accepted. Status ${status}.`);
            }
        });
    } else {
        offer.decline(err => {
            if (err) {
                console.log(err);    
            } else {
                console.log(`Donation declined`)
            }
        });
    }
});