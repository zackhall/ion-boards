angular.module('starter.services', ['firebase'])

.constant('FBURL', '<!-- Enter Firebase URL here -->')

.factory('Chats', function(FBURL, $firebaseArray, $firebaseObject) {
  var root = new Firebase(FBURL);
  var boardsRef = root.child('boards');

  return {
    allChats: allChats,
    getChat: function(board) {
      return {
        messages: messages(board),
        sendMessage: sendMessage(board)
      };
    }
  }

  ////

  function allChats() {
    var collection = 
      new Firebase.util.NormalizedCollection([boardsRef, 'boards'])
        .select('boards.metadata');

    return $firebaseArray(collection.ref());
  }

  function sendMessage(board) {
    var boardRef = boardsRef.child(board);

    return function(user, body) {
      var timestamp = Date.now();
      var message = {
        body: body,
        from: user,
        timestamp: timestamp
      };

      // add message, update metadata
      $firebaseArray(boardRef.child('messages'))
        .$add(message)
        .then(function() {
          $firebaseObject(boardRef.child('metadata'))
            .$loaded()
            .then(function(metadata) {
              metadata.board = board;
              metadata.lastUpdated = timestamp;
              metadata.lastMessage = message;
              metadata.$save();
            });
        });
    }
  }

  function messages(board) {
    return function() {
      return $firebaseArray(boardsRef.child(board).child('messages'));
    }
  }
})

.factory('BoardPopup', function ($ionicPopup) {
  return function (scope) {
    return $ionicPopup.prompt({
       title: 'New board',
       //template: 'Enter your secret password',
       inputType: 'text',
       inputPlaceholder: "Enter name for board"
     });
  }
});
