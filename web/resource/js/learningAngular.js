var myModule = angular.module('myModule', []);

myModule.factory('mySharedService', ['$rootScope',function($rootScope) {
    var sharedService = {};

    sharedService.message = '';
    sharedService.name = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.nameBroadcast = function(name) {
        this.name = name;
        this.broadcastItem();
    };
    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
}]);

myModule.controller('ControllerZero',['$scope', 'mySharedService',function ($scope, mySharedService) {
    $scope.message = 'Hello';
    $scope.name = 'World';

    $scope.$watch('message',function (msg) {
        mySharedService.prepForBroadcast(msg);
    });

    $scope.$watch('name',function (name) {
        mySharedService.nameBroadcast(name);
    });

    $scope.$on ('handleBroadcast', function () {
        $scope.message = mySharedService.message;
    });
}])

myModule.controller('ControllerOne',['$scope', 'mySharedService', function ($scope, mySharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'ONE: ' + mySharedService.message + ' ' + mySharedService.name;
    });
}])

myModule.controller('ControllerTwo',['$scope', 'mySharedService', function ($scope, mySharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'TWO: ' + mySharedService.message + ' ' + mySharedService.name;
    });
}])