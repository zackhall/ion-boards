angular.module('starter.services', [])

.factory('Chats', function() {

  // Some fake testing data
  var data = 
    {
      "boards": {
        "ionic-seattle": {
          "metadata": {
            "board": "ionic-seattle",
            "lastUpdated": 12345678,
            "lastMessage": {
              "from": "class",
              "body": "Doing well.",
              "timestamp": 12345678
            }
          },
          "messages": [{
              "from": "zack",
              "body": "Hi, everyone. How're you doing?",
              "timestamp": 12345678
            }, {
              "from": "class",
              "body": "Doing well.",
              "timestamp": 12345678
            }
          ]
        },
        "banter": {
          "metadata": {
            "board": "banter",
            "lastUpdated": 12345678,
            "lastMessage": {
              "from": "vivian",
              "body": "Get a new joke.",
              "timestamp": 12345678
            }
          },
          "messages": [{
              "from": "zack",
              "body": "Why did the chicken cross the road?",
              "timestamp": 12345678
            }, {
              "from": "vivian",
              "body": "Get a new joke.",
              "timestamp": 12345678
            }
          ]
        }
      }
    }

  var dataAsArray = [{
      "metadata": {
        "board": "ionic-seattle",
        "lastUpdated": 12345678,
        "lastMessage": {
          "from": "class",
          "body": "Doing well.",
          "timestamp": 12345678
        }
      }
    }, {
      "metadata": {
        "board": "banter",
        "lastUpdated": 12345678,
        "lastMessage": {
          "from": "vivian",
          "body": "Get a new joke.",
          "timestamp": 12345678
        }
      }
    }
  ]

  return {
    allChats: allChats,
    getChat: function(board) {
      return {
        messages: messages(board),
        sendMessage: sendMessage(board)
      };
    }
  }

  function allChats() {
    return dataAsArray;
  }

  function sendMessage(board) {

    return function(user, body) {
      var timestamp = Date.now();
      var message = {
        body: body,
        from: user,
        timestamp: timestamp
      };

      data.boards[board].messages.push(message);
    }
  }

  function messages(board) {
    return function() {
      return data.boards[board].messages;
    }
  }
});
