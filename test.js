const https = require('https');
const options = {
    hostname: 'steamcommunity.com',
    port: 443,
    path: '/inventory/76561198231708076/440/2/',
    method: 'GET'
}

const getInventory = function(options, callback){
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      
      req.on('error', error => {
        console.error(error)
      })
      
      req.end()
}
const inventory = "https://steamcommunity.com/inventory/76561198231708076/440/2/";

getInventory(options, (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(data.assets.appid + "\n");
});

