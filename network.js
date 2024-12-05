userArray = [];

// User Class
class User {
  constructor(name) {
    this.name = name;  // String
    this.friends = []; // Array of Users
    this.sentMessages = [];
    this.receivedMessages = [];
  }

  addFriend(user) {
    if (!this.friends.includes(user)) {
      this.friends.push(user);
      user.friends.push(this);
    }
  }

  getFriends() {
      const friendsList = this.friends.map((friend) => {
          return friend.name;
      })
      return friendsList;
  }

  printFriends() {
      this.friends.forEach((friend) => {
          return console.log(`${this.name}\'s friends: ${this.getFriends()}`)
      });
  }

  getReceivedMessages() {
    return this.receivedMessages.map((message) => {
      return runLengthDecode(message.messageBody) + ` (${message.sender.name})`;
    });
  }

  getSentMessages() {
    return this.sentMessages.map((message) => {
      return runLengthDecode(message.messageBody) + ` (${message.receiver.name})`;
    });
  }

  sendMessage(recipient, messageBody) { // (User, String)
    const encodedMessage = runLengthEncode(messageBody);
    const message = new Message(encodedMessage);
    message.sender = this;
    message.receiver = recipient;
    message.metadata.messageEncoding = "RLE"
    this.sentMessages.push(message);
    recipient.receivedMessages.push(message);
  }
}

class Message {
  constructor(messageBody) {
    this.messageBody = messageBody; // String
    this.messageBodyCompressed = "";
    this.sender;                    // User
    this.receiver;                  // User
    this.metadata = {
        messageEncoding: "",
    }
  }
}
  

// Merge Sort Function
function mergeSort(arr) {
    // Base case: if the array has one or zero elements, it's already sorted
    if (arr.length <= 1) {
      return arr;
    }
  
    // Split the array in half
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    // Recursively sort both halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
  
    // Merge the sorted halves and return the result
    return merge(sortedLeft, sortedRight);
  }
  
  // Merge function that merges two sorted arrays in descending order
  function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;
  
    // Merge until one of the arrays is exhausted
    while (i < left.length && j < right.length) {
      if (left[i][1] > right[j][1]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  
    // If there are remaining elements in the left array, add them to the result
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
  
    // If there are remaining elements in the right array, add them to the result
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }
  
    return result;
  }

    /*
  runLengthEncode(message) only works with strings of alphanumeric characters (no numbers)
  */
  function runLengthEncode(message) {
    if (!message) return ""; // Handle empty strings

    let encoded = "";
    let count = 1;

    for (let i = 1; i <= message.length; i++) {
        if (message[i] === message[i - 1]) {
            count++;
        } else {
            encoded += message[i - 1] + count; // Append character and count
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

  
/*
----------------------------------
--- VISUALIZATION USING VIS.JS ---
----------------------------------
*/

/*
// Create users
const users = [
Ari = new User("Ari", 20, "Female"),
Justin = new User("Justin", 33, "Male"),
Jesse = new User("Jesse", 24, "Female"),
Ashlyn = new User("Ashlyn", 21, "Female"),
James = new User("James", 23, "Male"),
Kai = new User("Kai", 23, "Male"),
Pedro = new User("Pedro", 23, "Male"),
];
  
// Create friends
Ari.addFriend(James);
Ari.addFriend(Kai);
Ari.addFriend(Pedro);

Justin.addFriend(James);
Justin.addFriend(Kai);
Justin.addFriend(Pedro);

Jesse.addFriend(James);
Jesse.addFriend(Kai);

Ashlyn.addFriend(James);
Ashlyn.addFriend(Kai);
Ashlyn.addFriend(Pedro);

James.addFriend(Ari);
James.addFriend(Justin);
James.addFriend(Jesse);
James.addFriend(Ashlyn);
James.addFriend(Kai);
James.addFriend(Pedro);

Kai.addFriend(Ari);
Kai.addFriend(Justin);
Kai.addFriend(Jesse);
Kai.addFriend(Ashlyn);
Kai.addFriend(James);
Kai.addFriend(Pedro);

Pedro.addFriend(Ari);
Pedro.addFriend(Justin);
Pedro.addFriend(Ashlyn);
Pedro.addFriend(James);
Pedro.addFriend(Kai);

// Send some messages
Pedro.sendMessage(Kai, "When we riding tonight?");
Justin.sendMessage(Kai, "How much for your car?");
  
*/

// Create nodes and edges for Vis.js
const nodes = new vis.DataSet();
const edges = new vis.DataSet();
  
/*
// Add user nodes (blue)
users.forEach((user) => {
    const friendsList = user.getFriends();
    const popUP = `Friends: ${friendsList}
    Sent messages: ${user.getSentMessages()}
    Received messages: ${user.getReceivedMessages()}`;
    nodes.add({
        id: user.name,
        label: `${user.name}`,
        title: popUP,
        color: "#2adefe",
        shape: "square",
    });
});
  
// Add friends edges
users.forEach((user) => {
user.friends.forEach((friend) => {
    edges.add({
    from: user.name,
    to: friend.name,
    color: "gray"
    });
});
});
*/
  
// Vis.js visualization options
const options = {
nodes: {
    font: {
    size: 16,
    },
},
edges: {
    color: { inherit: false },
    smooth: false,
},
physics: {
    enabled: false,
},
};
  
// Initialize the Vis.js network
const container = document.getElementById("network");
const data = { nodes, edges };
const network = new vis.Network(container, data, options);

// Function to add a new node
let newNodeId = 1; // Keep track of new node IDs
function addNode() {
  const newName = document.getElementById("nodeNameInput").value.trim();
  if (newName === "") {
    nodes.add({
      id: newNodeId,
      label: `Node ${newNodeId}`,
      title: `Sent messages: none
      Received messages: none`,
      color: "#2adefe",
      shape: "square",
    });
    userArray.push(new User(newNodeId));
    console.log(userArray);
  }
  else {
    nodes.add({
      id: newNodeId,
      label: `${newName}`, // If the text field has a name, set it as the node's name
      title: `Sent messages: none
      Received messages: none`,
      color: "#2adefe",
      shape: "square",
    });
    userArray.push(new User(newName));
    console.log(userArray);
  }
  newNodeId++;
}

// Function to rename the selected node
function renameNode() {
  const newName = document.getElementById("nodeNameInput").value.trim();
  if (selectedNodes.length !==null && newName) {
    if (selectedNodes.length == 1) {
      nodes.update({ id: selectedNodes[0], label: newName });
      userArray.find((user) => user.name == nodes.get(selectedNodes[0]).id).name = newName; // Set the new name of the user
    }
    else {
      nodes.update({ id: selectedNodes[1], label: newName });
      userArray.find((user) => user.name == nodes.get(selectedNodes[1]).id).name = newName; // Set the new name of the user
    }
    console.log(userArray);
  } else {
    alert("Please select a node and enter a valid name.");
  }
}

let selectedNodes = [];

// Listen for selecting multiple nodes
network.on("click", function (params) {
  if (params.nodes.length > 0) {
    const clickedNode = params.nodes[0];
    selectedNodes.push(clickedNode);
    if (selectedNodes.length > 2) {
      selectedNodes.shift(); // Keep only the last two selected nodes
    }
    console.log("Selected nodes:", selectedNodes);
    updateSelectedNodes();
  }
});

// Function to add an edge between the selected nodes
function addEdge() {
  if (selectedNodes.length === 2) {
    const [node1, node2] = selectedNodes;
    edges.add({ from: node1, to: node2 }); // Add an undirected edge
    user1 = userArray.find((user) => user == nodes.get(selectedNodes[0]).label) 
    user2 = userArray.find((user) => user == nodes.get(selectedNodes[1]).label) 
    user1.friends.push(user2); // Add the two users as friends
    user2.friends.push(user1); // Add the two users as friends
    selectedNodes = []; // Clear selection after adding the edge
    updateSelectedNodes();
  } else {
    alert("Please select two nodes to connect.");
  }
}

  // Reference to the HTML element that will display the selected nodes
  const selNodes = document.getElementById("selected-nodes");
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  // Function to update the displayed text with the selected nodes
  function updateSelectedNodes() {
    if (selectedNodes.length === 0) {
      selNodes.innerHTML = "Selected Nodes: None";
    } else if (selectedNodes.length === 1) {
      selNodes.innerHTML = `Selected Node: ${nodes.get(selectedNodes[0]).label}`;
    } else {
      selNodes.innerHTML = `Selected Nodes: ${nodes.get(selectedNodes[0]).label}, ${nodes.get(selectedNodes[1]).label}`;
      from.innerHTML = `From: ${nodes.get(selectedNodes[0]).label}`;
      to.innerHTML = `To: ${nodes.get(selectedNodes[1]).label}`;
    }
  }
