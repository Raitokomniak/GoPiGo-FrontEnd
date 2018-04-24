/* 
 * DataController
 *
 * This controller fetches data from the server via a HTTP request 
 * and stores it so it can be displayed on DataPage.html.
 */

module.controller('DataController', ['$scope', '$http', function ($scope, $http) {

        $scope.GPSLabel ="GPS";
        $scope.GPSData = "41°24’12.2″N   2°10’26.5″E";

        $scope.TemperatureLabel = "Temperature";
        $scope.TemperatureData = "15";
        
        $scope.LightLabel = "Light";
        $scope.LightData = "60";
        
        
        
        
        $scope.testGet = function () {
            var xmlhttp = new XMLHttpRequest();

            //endpoint url
            var url = "/testGet";

            //SEND REQUEST
            //echo response if successful
            xmlhttp.onreadystatechange = function () {
                                            //if readystates required
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    document.getElementById('responseMessage').innerHTML = xmlhttp.responseText;
                }
            };
            xmlhttp.open("GET", url, true); 
            xmlhttp.send();
        }
        
        
        
        
        
        
        $scope.testPush = function () {
            var xmlhttp = new XMLHttpRequest();
            //endpoint url
            url = "/testPush";

            //sent data (car command)
            var driveData = {
                data: {
                    dir: 1
                }
            };
            console.log(JSON.stringify( driveData ));

            //SEND REQUEST
            //echo response if successful
            xmlhttp.onreadystatechange = function () {
                            //if readystates required
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    document.getElementById('responseMessage').innerHTML = xmlhttp.responseText;
                }
            };
            
            xmlhttp.open("POST", url, true);
            xmlhttp.send(JSON.stringify(driveData));
        }

       

    }]);


 