'use strict';

const snippets = [
  '0.1 + 0.2',
  'NaN === NaN',
  '[1, 3, 7].map(n => n*3)',
  '[..."Count letters occurrence in a string.".toLowerCase()]\n' +
    '.filter(letter => letter >= "a" && letter <= "z")' +
    '.sort()' +
    '.reduce((counter, letter) =>\n  (counter[letter] = 1 + counter[letter] || 1, counter),\n  {})',
  '// keep odd numbers only\n[1, 3, 4, 8, 11, 22, 33].filter(number => number % 2)',
  '// sort array of numbers\n[18, 5, 4, 22, 1, 6, 0, -5].sort((a, b) => a - b)',
  "// swap variables' values\nlet a = 3, b = 8; [b, a] = [a, b]; [a, b]",
  '// unique array elements\n[...new Set([1, 2, 5, 1, 7, 2])]',
  '[...new Set([..."Get a list of unique characters in a string. Ordered. Letters are capitalized".toUpperCase()])]\n  .sort()',
];

exports.snippets = snippets;
