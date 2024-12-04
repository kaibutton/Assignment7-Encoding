const message = "The quick brown fox stepped quietly over the aggressive sleeping bear";
const message2 = "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW";
const message3 = "space ";

function runLengthEncode(input) {
  if (!input) return ""; // Handle empty strings

  let encoded = "";
  let count = 1;

  for (let i = 1; i <= input.length; i++) {
      if (input[i] === input[i - 1]) {
          count++;
      } else {
          encoded += input[i - 1] + count; // Append character and count
          count = 1; // Reset count
      }
  }

  return encoded;
}

function runLengthDecode(encoded) {
  if (!encoded) return ""; // Handle empty strings

  let decoded = "";
  let i = 0;
  while (i < encoded.length) {
    let count = "";
    const char = encoded[i]; // char is set to current index
    i++;                     // index will move to next number
    count += encoded[i];
    while (!isNaN(encoded[i + 1]) && encoded[i + 1] !== " ") { // While there are more than two digits for the count
      i++;
      count += encoded[i];
    }
    decoded += char.repeat(parseInt(count, 10));
    i++;
  }
  return decoded;
}

// Example Usage
console.log(`message = "${message}"`);
const encodedMessage = runLengthEncode(message);
console.log(`encodedMessage = "${encodedMessage}"`);
const decodedMessage = runLengthDecode(encodedMessage);
console.log(`decodedMessage = "${decodedMessage}" = message = "${message}"`);
