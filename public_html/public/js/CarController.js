/*
 * CarController
 
 * This controller detects button input or keyboard input
 * 
 */

module.controller('CarController', ['$scope', '$http', function ($scope, $http) {

        $scope.driveKeysDown = [false, false, false, false];
        $scope.senders = [1];
        $scope.sendingInterval = 100; // in milliseconds (100 is default)
        $scope.lastClicked = -1;

        ////////////////////////////////////////////
        //MOUSE INPUT
        ////////////////////////////////////////////

        $scope.onDriveButtonClick = function (dir) {
            $scope.lastClicked = dir;
            $scope.drive(dir);
        }

        $(window).mouseup(function () {
            $scope.stopSending($scope.lastClicked);
            $scope.lastClicked = -1;
        });

        ////////////////////////////////////////////
        //KEYBOARD INPUT
        ////////////////////////////////////////////

        document.onkeydown = function (event) {
            var dir = $scope.getKeyId(event.keyCode);
            if (!$scope.driveKeysDown[dir]) { //prevent multiple events
                if ($scope.checkKeyAvailability(dir)) {
                    $scope.changeStyle(true, dir);
                    $scope.driveKeysDown[dir] = true;
                    $scope.drive(dir);
                }
            }
        }

        ////////////////////////////////////////////
        //MOUSE INPUT
        ////////////////////////////////////////////

        $scope.onDriveButtonClick = function (dir) {
            $scope.lastClicked = dir;
            $scope.drive(dir);
        }

        $(window).mouseup(function () {
            $scope.stopSending($scope.lastClicked);
            $scope.lastClicked = -1;
        });

        ////////////////////////////////////////////
        //KEYBOARD INPUT
        ////////////////////////////////////////////

        document.onkeydown = function (event) {
            var dir = $scope.getKeyId(event.keyCode);
            if (!$scope.driveKeysDown[dir]) { //prevent multiple events
                if ($scope.checkKeyAvailability(dir)) {
                    $scope.changeStyle(true, dir);
                    $scope.driveKeysDown[dir] = true;
                    $scope.drive(dir);
                }
            }
        }

        document.onkeyup = function (event) {

            var dir = $scope.getKeyId(event.keyCode);
            if ($scope.driveKeysDown[dir]) {
                $scope.driveKeysDown[dir] = false;
                $scope.changeStyle(false, dir);
                $scope.stopSending(dir);
            }
        };

        $scope.getKeyId = function (keyCode) {
            if (keyCode === 87) {
                return 0;
            } else if (keyCode === 65) {
                return 1;
            } else if (keyCode === 68) {
                return 2;
            } else if (keyCode === 83) {
                return 3;
            } else {
                console.log("This key doesn't do anything");
            }

            //37 == left arrow 39 == right arrow
        }

        $scope.checkKeyAvailability = function (dir) { // Checks that keys of the same axis cant be pressed at the same time

            $scope.canPressKey = false;
            if (dir === 0) {
                if (!$scope.driveKeysDown[3])
                    $scope.canPressKey = true;
            } else if (dir === 1) {
                if (!$scope.driveKeysDown[2])
                    $scope.canPressKey = true;
            } else if (dir === 2) {
                if (!$scope.driveKeysDown[1])
                    $scope.canPressKey = true;
            } else if (dir === 3) {
                if (!$scope.driveKeysDown[0])
                    $scope.canPressKey = true;
            }
            return $scope.canPressKey;
        }

        $scope.changeStyle = function (toggle, dir) { // Changes button style to "clicked" for key-triggered buttons
            var button = "";

            if (dir === 0)
                button = $("#driveButton0");
            else if (dir === 1)
                button = $("#driveButton1");
            else if (dir === 2)
                button = $("#driveButton2");
            else if (dir === 3)
                button = $("#driveButton3");

            if (toggle) {
                button.addClass('drivebutton-fakepressed');
            } else {
                if (button !== "")
                    button.removeClass('drivebutton-fakepressed');
            }
        }

        ////////////////////////////////////////////
        // DATA SENDER
        ////////////////////////////////////////////

        $scope.drive = function (dir) {
            var driveDir = "";  // for debugging

            if (dir === 0)
                driveDir = "Forward";
            if (dir === 1)
                driveDir = "Left";
            if (dir === 2)
                driveDir = "Right";
            if (dir === 3)
                driveDir = "Reverse";

            /*$scope.senders[dir] = setInterval(function () {
             $scope.sendData(dir, driveDir);
             }, $scope.sendingInterval);*/


            $scope.sendData(dir, driveDir);
            $scope.sendDataViaSocket(dir, driveDir);
        };

        $scope.sendDataViaSocket = function (dir, driveDir) {
            console.log("Sending: Drive " + driveDir);
            socket.emit('command', dir)
        }

        $scope.stopSending = function (dir) {
            if (dir >= 0) {
                clearInterval($scope.senders[dir]);
                console.log("Stopped sending, killed sender id " + dir);
            }
        }


        $scope.sendData = function (dir, driveDir) {
            console.log("Sending: Drive " + driveDir);

            var command = "command=" + driveDir;
            //console.log(command);

            var sqlReq = new XMLHttpRequest();
            sqlReq.open("POST", "http://www.students.oamk.fi/~t2kaja04/GoPiGo/php/movement.php", true);
            sqlReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            sqlReq.onreadystatechange = function () {
                if (sqlReq.readyState == 4 && sqlReq.status == 200) {
                    var return_data = sqlReq.responseText;
                    console.log(return_data);
                }
            }
            sqlReq.send(command);
        }

        
         $scope.createCORSRequest = function(method, url){
         var xhr = new XMLHttpRequest();
         if("withCredentials" in xhr){
         xhr.open(method, url);
         }
         else if(typeof XDomainRequest != "undefined"){
         xhr = new XDomainRequest();
         xhr.open(method, url);
         }
         else {
         xhr = null;
         }
         return xhr;
         
         }

        $scope.stopSending = function (dir) {
            $scope.sendData(-1, "Stop");

            if (dir >= 0) {
                clearInterval($scope.senders[dir]);
                //console.log("Stopped sending, killed sender id " + dir);
            }
        }

    }]);