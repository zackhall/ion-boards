angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $state, Chats, BoardPopup) {

  $scope.chats = Chats.allChats();

  $scope.newBoard = function() {
    BoardPopup()
      .then(function(name) {
        if (name) {
          $state.go('^.chat-detail', { chatId: name });
        }
      })
  }

  // var chat = Chats.getChat('zacks-room');
  // chat.sendMessage('user1', 'Welcome to zacks board. This is a much, much, much longer message!');
  // chat.sendMessage('user2', 'ohhh, cool.');
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    var chatId = $stateParams.chatId;
    var chat = Chats.getChat(chatId);

    $scope.name = chatId;
    $scope.messages = chat.messages();

    $scope.sendMessage = function(body) {
      chat.sendMessage('zthall', body);
      clearNewMessage();
    };

    function clearNewMessage() {
      $scope.message = '';
    }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
