'use strict';

const telegramApiUrl = "https://api.telegram.org/bot" +
  process.env.TELEGRAM_API_TOKEN +
  "/sendMessage";

const sandBoxRestrictions = {
  maxSourceCodeLength: {
    value: 255,
    onErrorMessage: 'Source code max length is ',
  },
  warnOnOccurrence: {
    value: ['require', 'setInterval', 'setTimeout', 'setImmediate'],
    onErrorMessage: 'Warning! Neither of the following is supported: ',
  },
};

const sandBoxConfig = {
  timeout: 3000,
  sandbox: {},
  console: 'redirect',
  require: {
    external: ['request'],
  },
  compiler: 'javascript',
  eval: false,
  wasm: false,
};

exports.sandBoxRestrictions = sandBoxRestrictions;
exports.sandBoxConfig = sandBoxConfig;
exports.telegramApiUrl = telegramApiUrl;
