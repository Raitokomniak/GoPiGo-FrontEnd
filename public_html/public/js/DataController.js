/* 
 * DataController
 *
 * This controller fetches data from the server
 */

module.controller('DataController', ['$scope', '$http', function ($scope, $http) {
        $scope.pollingInterval = 1000; // in milliseconds (100 is default)

        $scope.GPSLabel = "GPS";
        $scope.GPSData = "";

        $scope.TemperatureLabel = "Temperature";
        $scope.TemperatureData = "";

        $scope.LightLabel = "Light";
        $scope.LightData = "";

        window.onload = function () {
            console.log("onload")
             $scope.getData();
        }

        $scope.getData = function () {
            
        }

    }]);


 