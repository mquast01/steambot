//idle 
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
    steam: client,
    community: community,
    language: 'en'
});

const logOnOptions = {
  accountName: 'obamachiapet',
  password: '5MP4HP623HP',
  twoFactorCode: SteamTotp.generateAuthCode('hJHE2rOPvTk1Xxf1gBoHK+7PNf8=')
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Logged into Steam');
  
    client.setPersona(SteamUser.EPersonaState.Online, 'Obama Chia Pet');
    client.gamesPlayed(440);
});