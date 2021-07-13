//chiapetobama@gmail.com
//log on

const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const config = require('./config.json');
const client = new SteamUser();

const logOnOptions = {
  accountName: 'obamachiapet',
  password: '5MP4HP623HP', 
  twoFactorCode: SteamTotp.generateAuthCode('hJHE2rOPvTk1Xxf1gBoHK+7PNf8=')
};

client.logOn(logOnOptions.EPersonaState.Online);

client.on('loggedOn', () => {
    console.log('Logged into Steam');
  
    client.setPersona(SteamUser.EPersonaState.Online, 'Obama Chia Pet');
});