(function (angular) {
"use strict";

var app = angular.module("MyApp", []);

app.value("VERSION", "0.0.1");

app.factory("SomeService", function () {
    return {
        toUpper: function (str) {
            return str.toUpperCase();
        }
    }
});

app.controller("Main", ["$scope", "$location", "$timeout", "$http", "SomeService", function ($scope, $location, $timeout, $http, SomeService) {

    $scope.status = {
        isWaiting: true,
        iRunning: false,
        isSaved: false
    }
    
    $scope.data = {};

    $scope.changePage = function (url) {
        $location.path(url);
    }

    $scope.setName = function (text) {
        $scope.name = SomeService.toUpper(text);
    }

    $scope.send = function () {
        $scope.status.isWaiting = false;
        $scope.status.isRunning = true;

        $http.post("/some/url", { name: $scope.name }).
            success(function (data) {
                $scope.status.isSaved = true;
                $scope.data = data;
            }).
            error(function (data) {
                $scope.status.isWaiting = true;
                $scope.status.isRunning = false;
                $scope.clean(data);
            });
    }

    $scope.jquery = function () {
        $.ajax({});
    };

    $scope.clean = function () {
        $timeout(function () {
            $scope.name = "";
        }, 1000);
    }
}]);

}(window.angular));
