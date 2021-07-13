
function searchKillstreak(community, name, killstreakArray, callback){



  /*
    community.getSteamUser(name, (err, user) => {

      //var killstreakDesc = { 'value':'Killstreaks Active', 'color': '7ea9d1'};
        if(err) console.log(err);

        else 
        user.getInventoryContents(440, 2, true, (err, inven) => {
          
          for (var key in inven) {
            if (obj.hasOwnProperty(key)) {
                if ("object" == typeof(obj[key])) {
                    getNames(obj[key], name);
                } else if (key == name) {
                    result.push(obj[key]);
                }
            }
          }
          /*
          for(i = 0; i < inven.length; i++){
            for(j = 0; j < inven[i].descriptions.length; j++) {
              if(inven[i].descriptions[j].value == ks_desc.value && inven[i].descriptions[j].color == ks_desc.color){
                ks_array.push(inven[i].market_hash_name);
              }
            }
            

          }    
          
          callback(); 
       });
   
      });
      */
      callback(); 
}
module.exports = {searchKillstreak};
