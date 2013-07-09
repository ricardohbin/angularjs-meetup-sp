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

app.controller("Main", ["$scope", "$location", "SomeService", function ($scope, $location, SomeService) {
    $scope.status = {
        waiting: true,
        running: false
    }

    $scope.changePage = function (url) {
        $location.path(url);
    }

    $scope.setName = function (text) {
        $scope.text = SomeService.toUpper(text);
    }
}]);



}(window.angular));
