angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.allChats();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    var chatId = $stateParams.chatId;
    var chat = Chats.getChat(chatId);

    $scope.name = chatId;
    $scope.messages = chat.messages();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
