var myModule = angular.module('myModule', []);

myModule.factory('mySharedService', function($rootScope) {
    var sharedService = {};
    
    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
});

myModule.controller('ControllerZero',['$scope', 'mySharedService',function ($scope, mySharedService1) {
    $scope.message = 'Hello';
    $scope.$watch('message',function (msg) {
        mySharedService1.prepForBroadcast(msg);
    });

    $scope.$on ('handleBroadcast', function () {
        $scope.message = mySharedService1.message;
    });
}])

myModule.controller('ControllerOne',['$scope', 'mySharedService', function ($scope, mySharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'ONE: ' + mySharedService.message;
    });
}])

myModule.controller('ControllerTwo',['$scope', 'mySharedService', function ($scope, mySharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'TWO: ' + mySharedService.message;
    });
}])
