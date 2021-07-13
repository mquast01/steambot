const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  name: "bible",
  execute(message) {
        axios.get('https://beta.ourmanna.com/api/v1/js/?order=random?format=json')
        .then(function (response) {
                var verse = JSON.parse(response.data);
                console.log(typeof response);
                console.log(response);
                return message.channel.send(verse.mannaverse);
        });
  }
};