const { executeInASandbox } = require('./sandbox.js');
const { telegramApiUrl } = require('./config.js');
const axios = require('axios');
const { json } = require('micro');

const jsConsoleBot = async (req, res) => {
  let reqBody;
  // the following code fragment is required by zeit.now
  reqBody = await json(req);
  const { message } = reqBody;
  if (!message || !message.text) {
    const requestError = 'JSConsoleBot Error. Bad request: ' + JSON.stringify(reqBody, null, 2);
    console.error(requestError);
    res.end(requestError);
    return;
  }

  console.log('JSConsoleBot Message received: ' + JSON.stringify(message, null, 2));

  const command = message && message.text.toLowerCase().split(' ')[0];
  let reply;
  switch (command) {
    case '/help':
      reply = "Send me /js command and some code. Multiline (Shift-Enter) is OK for me.";
      break;
    case '/js':
      let sourceCode = message.text.substring(3).trim();
      if (sourceCode.length) {
        const result = executeInASandbox(sourceCode);
        reply = "```\n" + emulateConsoleInput(sourceCode) + '\n' + result + "\n```";
      } else {
        reply = "No code to execute."
      }
      break;
    default:
      reply = "Unknown command. Send me /help or /js";
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
