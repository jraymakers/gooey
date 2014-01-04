(function () {
  var module = angular.module('gooey', []);
  module.directive('gyMain', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/main.html'
    };
  });
})();
