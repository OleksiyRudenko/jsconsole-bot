'use strict';

const replyToUrl = process.env.TELEGRAM_API_TOKEN
  ? "https://api.telegram.org/bot" + process.env.TELEGRAM_API_TOKEN + "/sendMessage"
  : "SENDER";

const sandBoxRestrictions = {
  maxSourceCodeLength: {
    value: 255,
    onErrorMessage: 'Source code max length is ',
  },
  warnOnOccurrence: {
    value: ['console', 'require', 'setInterval', 'setTimeout', 'setImmediate'],
    onErrorMessage: 'Warning! Neither of the following is supported: ',
  },
};

const sandBoxConfig = {
  timeout: 3000,
  sandbox: {},
  compiler: 'javascript',
  eval: false,
  wasm: false,
};

exports.sandBoxRestrictions = sandBoxRestrictions;
exports.sandBoxConfig = sandBoxConfig;
exports.replyToUrl = replyToUrl;
