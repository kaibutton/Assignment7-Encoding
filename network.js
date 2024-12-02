// User Class
class User {
    constructor(name, age, gender) {
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.friends = []; // Array of Users
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
  }

  class Message {
    constructor(messageBody) {
        this.messageBody = messageBody; // String
        this.messageBodyCompressed = "";
        this.sender;                    // User
        this.receiver                   // User
        this.metadata = {
            messageLengthOriginal: this.messageBody.length,
            messageLengthCompressed: this.messageBodyCompressed.length,
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
----------------------------------
--- VISUALIZATION USING VIS.JS ---
----------------------------------
*/
  
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

// Print friends list to console
users.forEach((user) => {
    user.printFriends();
});
  
// Create nodes and edges for Vis.js
const nodes = new vis.DataSet();
const edges = new vis.DataSet();
  
// Add user nodes (blue)
users.forEach((user) => {
    const friendsList = user.getFriends();
    const popUP = `friends: ${friendsList}`;
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
  
// Visualization options
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

const numeroUno = 6;
//document.getElementById("H1text").innerText = `Most friends: ${} Count: ${}`;