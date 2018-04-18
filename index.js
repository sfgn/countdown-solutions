let fs = require('fs');
let path = require('path');

function swap(chars, i, j) {
    var tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
}

function getCombinations(chars) {
  const length = 9;
  let counter = [];
  let combinations = [];
  let i;

  for (i = 0; i < length; i++) {
      counter[i] = 0;
  }

  i = 0;
  combinations.push(chars.join(''));
  while (i < length) {
      if (counter[i] < i) {
          swap(chars, i % 2 === 1 ? counter[i] : 0, i);
          counter[i]++;
          i = 0;
          combinations.push(chars.join(''));
      } else {
          counter[i] = 0;
          i++;
      }
  }

  return combinations;
}

let dictionary = fs.readFileSync(path.dirname(require.main.filename) + '/dictionary.txt').toString().split("\r\n");

var stdin = process.openStdin();
console.log('What are the letters? ');

stdin.addListener("data", function(d) {
  let letters =  d.toString().trim().split('');
  let words = getCombinations(letters);
  let wordList = {};
  let output = {};

  for (w in dictionary) {
    wordList[dictionary[w].toLowerCase()] = dictionary[w];
  }

  words.map(word => {
    let currentWord = '';

    word.split('').map(char => {
      currentWord += char;
      if (currentWord.length > 2 && typeof wordList[currentWord] !== 'undefined') {
        output[currentWord] = currentWord;
      }
    });
  });

  let realWords = Object.keys(output).map(val => {
    return val;
  });

  realWords = realWords.sort((a,b) => {
    return a.length - b.length;
  });


  realWords.map(word => {
    console.log(word.length + ': ' + word);
  });

  process.exit(0);
});
