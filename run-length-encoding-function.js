const message = "The quick brown fox stepped quietly over the aggressive sleeping bear";
const message2 = "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW";
const message3 = "space ";

function RLE(message) {
    if (message.length === 0) {
        return ""; // Handle empty string edge case
    }

    let encoded = "";
    let count = 1;
  
    for (let i = 1; i <= message.length; i++) {
      // Check if the current character is the same as the previous one
      if (message[i] === message[i - 1]) {
        count++;
      } else {
        // Append the character and its count to the encoded string
        encoded += message[i - 1] + count;
        count = 1; // Reset the count
      }
    }
  
    return encoded;
}

function decodeRLE(message) {
    let decoded = "";
    let i = 0;
  
    while (i < message.length) {
      let char = message[i]; // Current character (including spaces)
      i++;
      let count = ""; // To accumulate the count (in case of multi-digit numbers)
  
      // Collect all digits following the character
      while (i < message.length && !isNaN(message[i])) {
        count += message[i];
        i++;
      }
  
      // Repeat the character `count` times and append to the result
      decoded += char.repeat(parseInt(count, 10));
    }
  
    return decoded;
}

function runLengthEncode(input) {
    let encoded = "";
    let count = 1;
  
    // Iterate through the string starting from the second character
    for (let i = 1; i <= input.length; i++) {
      // Check if the current character is the same as the previous one
      if (input[i] === input[i - 1] && i < input.length) {
        count++; // Increment the count if the character is the same
      } else {
        // Add the previous character and its count to the encoded string
        encoded += input[i - 1] + count;
        count = 1; // Reset the count for the next character
      }
    }
  
    return encoded;
  }
  

  function runLengthDecode(encoded) {
    let decoded = "";
    let i = 0;
  
    while (i < encoded.length) {
      let char = encoded[i]; // Get the character (could be a space or other character)
      i++; // Move to the next character, which should be the number
      let count = "";
  
      // Collect all digits for the count
      while (i < encoded.length && !isNaN(parseInt(encoded[i]), 10)) {
        count += encoded[i];
        i++;
      }
  
      // Ensure count is not empty and append the character repeated `count` times
      if (count) {
        decoded += char.repeat(parseInt(count, 10));
        console.log(`Added ${char} ${parseInt(count, 10)} times to decoded`);
      }
    }
  
    return decoded;
  }
  
  
  
  
/*
// Encoded messages with spaces included
const encodedMessage1 = "T1h1e1 1q1u1i1c1k1 1b1r1o1w1n1 1f1o1x1";
console.log(runLengthDecode(encodedMessage1)); 
// Output: "The quick brown fox"

const encodedMessage2 = "T1h1e1 4q1u1i1c1k1";
console.log(runLengthDecode(encodedMessage2)); 
// Output: "The    quick"
*/

const encodedMessage4 = "a2 3";
console.log(runLengthDecode(encodedMessage4)); 
// Output: "a   b"

/*
const encodedMessage5 = " 1T1h1i1s1 1i1s1 1a1 1t1e1s1t1 2";
console.log(runLengthDecode(encodedMessage5)); 
// Output: " This is a test  "
*/
