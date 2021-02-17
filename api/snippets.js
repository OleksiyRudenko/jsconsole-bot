'use strict';

const snippets = [
  '0.1 + 0.2',
  'NaN === NaN',
  '[1, 3, 7].map(n => n*3)',
  '[..."Count letters occurrence in a string.".toLowerCase()]\n' +
    '.filter(letter => letter >= "a" && letter <= "z")' +
    '.sort()' +
    '.reduce((counter, letter) =>\n  (counter[letter] = 1 + counter[letter] || 1, counter),\n  {})',
  '[1, 3, 4, 7, 8, 11, 15, 22, 24, 33].filter(number => number % 2)',
  '[18, 5, 4, 22, 1, 6, 0, -5].sort((a, b) => a - b)',
];

exports.snippets = snippets;
