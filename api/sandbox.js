'use strict';

const { VM } = require('vm2');
const { sandBoxRestrictions, sandBoxConfig } = require('./config.js');
const stringifyObject = require('stringify-object');

function executeInASandbox(sourceCode) {
  const validity = validate(sourceCode);
  if (!validity.isValid) return validity.message;
  let result, logs = [];
  const log = (...data) => {
    console.log("log called with", data);
    logs.push(data.join(' '));
  }
  ['dir', 'error', 'info', 'log', 'trace', 'warn', ]
    .forEach(consoleMethod => sandBoxConfig.sandbox.console[consoleMethod] = log);
  const vm = new VM(sandBoxConfig);
  try {
    result = vm.run(sourceCode);
  } catch (e) {
    console.log(e);
    return '' + e;
  }
  console.log(logs);
  return (validity.message.length ? validity.message + '\n' : '') +
    logs.join('\n') + '\n' +
    stringify(result);
}

function validate(sourceCode) {
  const validity = {
    isValid: true,
    message: [],
  };
  if (sourceCode.length > sandBoxRestrictions.maxSourceCodeLength.value) {
    validity.isValid = false;
    validity.message.push(
      sandBoxRestrictions.maxSourceCodeLength.onErrorMessage +
      sandBoxRestrictions.maxSourceCodeLength.value
    );
  }
  const regex = RegExp(sandBoxRestrictions.warnOnOccurrence.value.join('|'));
  if (regex.test(sourceCode)) {
    validity.message.push(
      sandBoxRestrictions.warnOnOccurrence.onErrorMessage +
      sandBoxRestrictions.warnOnOccurrence.value.join(', ')
    );
  }
  validity.message = validity.message.join("\n");
  return validity;
}

function stringify(value) {
  return stringifyObject(value, {
    indent: '  ',
    singleQuotes: false,
    inlineCharacterLimit: 12,
  });
}

exports.executeInASandbox = executeInASandbox;
