app.controller('ExampleController', ['$scope', '$interval',
  function ($scope, $interval) {
    $scope.format = 'd/M/yy H:mm:ss a';
    $scope.blood_1 = 100;
    $scope.blood_2 = 120;
    $scope.isDisabled = false;

    var stop, delay;
    $scope.fight = function () {
      if (angular.isDefined(stop)) return;
      if (angular.isDefined(delay)) $interval.cancel(delay);

      stop = $interval(function() {
        $scope.blood_1 -= demage();
        if ($scope.blood_1 <= 0) delayGame(3000);
        $scope.blood_2 -= demage();
        if ($scope.blood_2 <= 0) delayGame(4000)
      }, 100);
    };

    function demage() {
      return Math.floor(Math.random() * 10) + 1;
    }

    function delayGame(mTime) {
      finishFight();
      delay = $interval(function () {
        if (angular.isDefined(stop)) return;
        $scope.resetFight();
        $scope.fight();
      }, mTime);
    }

    function finishFight() {
      if (angular.isDefined(stop)){
        $interval.cancel(stop);
        stop = undefined;
        $scope.isDisabled = true;
      }
    }

    $scope.stopFight = function () {
      if (angular.isDefined(delay)) $interval.cancel(delay);
      finishFight();
    };

    $scope.resetFight = function () {
      if (angular.isDefined(delay)) $interval.cancel(delay);
      finishFight();
      $scope.blood_1 = 100;
      $scope.blood_2 = 120;
      $scope.isDisabled = false;
    };

    $scope.$on('$destroy', function () {
      $scope.stopFight();
    });
  }]);
