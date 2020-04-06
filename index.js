const slackBot = require('slackbots');
const axios = require('axios');

const bot = new slackBot({
    token:"xoxs-1024452955841-1036363165494-1048306973285-ddc522997b7a51192e2c6c042cefa6527284b13a273bfe30b4107bd356814ff8",
    name:"hotosm"
});
 
// Start Handler
bot.on('start', () => { 
  const params = {
    icon_emoji: ':smiley:'
  };  

  bot.postMessageToChannel(
    'hotosm',
    'Type "@hotosm `state` `district` cases" Mind the spaces e.g:[ @hotosm Punjab Amritsar cases ] and it will give you the total number of confirmed cases of covid in that district'
  );
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});
let stateName = "";
let districtName = "";
// Respons to Data
function handleMessage(message) {
  if(message.includes(' cases')){
      let starr = message.split(" ");
    stateName = starr[1];
    districtName = starr[2];
    confirmedCases();
  } else if(message.includes(' help')){
    runhelp();
  }
}

function confirmedCases() {
  axios.get('https://api.covid19india.org/state_district_wise.json').then(res => {
    const joke = res.data[stateName].districtData[districtName].confirmed;

    const params = {
      //used to pass any icon or emoji to the channel chat
    };

    bot.postMessageToChannel('hotosm', `Covid cases in ${districtName} : ${joke}`, params);
  });
}
 
 
// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'hotosm',
    'Type "@hotosm `state` `district` cases" Mind the spaces e.g:[ @hotosm Punjab Amritsar cases ] and it will give you the total number of confirmed cases of covid in that district',
    params
  );
} 