//chiapetobama@gmail.com
//trade 2 random items

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
    client.setPersona(SteamUser.EPersonaState.Online, 'Obama Chia Pet');
    //client.gamesPlayed(440);

    sendRandomItem();

    manager.setCookies(cookies);

    community.setCookies(cookies);
    community.startConfirmationChecker(10000, config.identitysecret);
});


manager.on('newOffer', offer => {
    if (offer.partner.getSteamID64() === '76561198231708076') {
        offer.accept((err, status) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Accepted offer. Status: ${status}.`);
            }
        });
    } else {

    }
});


function sendRandomItem() {
    const partner = '76561198231708076';
    const appid = 440;
    const contextid = 2;
    manager.loadInventory(appid, contextid, true, (err, inventory) => {
        if(err) {
            console.log(err);
        } else {
            //add item
            const offer = manager.createOffer(partner);
            const item = inventory[Math.floor(Math.random() * inventory.length-1)];
            offer.addMyItem(item);
            
            //add partner item
            manager.getUserInventoryContents(partner, appid, contextid, true, (err, theirInv) => {
                if (err) {
                    console.log(err);
                } else {
                    const theirItem = theirInv[Math.floor(Math.random() * theirInv.length -1)];
                    offer.addTheirItem(theirItem);
                    offer.setMessage(`${theirItem.name} for ${item.name}`);

                    offer.send((err, status) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(`Sent offer.Status: ${status}.`)
                        }
                    })
                }
            });
           
        }
    });
}






