const { executeInASandbox } = require('./sandbox.js');
const { telegramApiUrl } = require('./config.js');
const axios = require('axios');
const { json } = require('micro');
const { snippets } = require('./snippets.js');

const noCodeMessage = "I received no code to execute.\nFeed me something, e.g. `/js 0.1 + 0.2`\n" +
  "I am OK with multiline input (using Shift-Enter).\n" +
  "My version is 1.1.2\n\n" +
  "Meanwhile I execute a random JS snippet for you\n\n";

const jsConsoleBot = async (req, res) => {
  let reqBody;
  // the following code fragment is required by zeit.now
  try {
    reqBody = await json(req);
  } catch(e) {
    console.error(e);
  }
  const { message } = reqBody;
  if (!message || !message.text) {
    const requestError = 'JSConsoleBot Error. Bad request: ' + JSON.stringify(reqBody, null, 2);
    console.error(requestError);
    res.end(requestError);
    return;
  }

  console.log('JSConsoleBot Message received:\n' + JSON.stringify(message, null, 2));

  const command = message && message.text.toLowerCase().split(' ')[0];
  let reply = '';
  switch (command) {
    case '/js-help':
    case '/jshelp':
    case '/jsbot-help':
    case '/jsbothelp':
      reply = "Send me /js command and some code. Multiline (Shift-Enter) is OK for me.";
      break;
    case '/js':
      let sourceCode = message.text.substring(3).trim();
      if (!sourceCode.length) {
        reply = noCodeMessage;
        sourceCode = snippets[Math.floor(Math.random() * snippets.length)]
      }
      const result = executeInASandbox(sourceCode);
      reply += "```\n" + emulateConsoleInput(sourceCode) + "\n\n" + result + "\n```";
      break;
  }
  sendMessage(telegramApiUrl, message, reply, res);
};

function emulateConsoleInput(string) {
  return "> " + string.split("\n").join("\n> ");
}

function sendMessage(url, message, reply, res){
  axios.post(url, {
    chat_id: message.chat.id,
    text: reply,
    parse_mode: 'markdown',
  }).then(() => { // response omitted
    console.log("JSConsoleBot Message posted");
    res.end("ok");
  }).catch(error => {
    console.log(error);
    res.end("JSConsoleBot Error: " + error);
  });
}

module.exports = jsConsoleBot;
