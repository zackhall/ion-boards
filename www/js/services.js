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

.service('Session', function ($q, $localstorage, NamePopup) {
  this.setUser = function(user) {
    $localstorage.set('user', user)
    this.user = user;
  };

  this.getUser = function() {
    return $q(function (resolve, reject) {
      if (this.user) {
        resolve(this.user);
      } else if ($localstorage.get('user')) {
        this.user = $localstorage.get('user');
        resolve(this.user);
      } else {
        NamePopup().then(function (user) {
          $localstorage.set('user', user)
          this.user = user;
          resolve(user);
        });
      }
    });

  }

  this.clearUser = function() {
    this.user = null;
    $localstorage.set('user', '');
  };

  return this;
})

.factory('$localstorage', function ($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
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
})

.factory('NamePopup', function ($ionicPopup) {
  return function () {
    return $ionicPopup.prompt({
       title: 'Set username',
       //template: 'Enter your secret password',
       inputType: 'text',
       inputPlaceholder: "What's your name?"
     });
  }
});
