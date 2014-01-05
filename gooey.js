(function () {
  var module = angular.module('gooey', []);
  module.factory('RecursionHelper', function ($compile) {
    return {
      compile: function (element) {
        var contents = element.contents().remove();
        var compiledContents;
        return function (scope, element) {
          if(!compiledContents){
            compiledContents = $compile(contents);
          }
          compiledContents(scope, function (clone) {
            element.append(clone);
          });
        };
      }
    };
  });
  module.directive('gyMain', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/main.html',
      controller: function ($scope) {
        $scope.rootPanel = {
          rows: ['main 1', 'main 2'],
          subpanel: {
            position: 'bottom',
            height: 100,
            panel: {
              rows: ['main bottom 1', 'main bottom 2'],
              subpanel: {
                position: 'left',
                width: 200,
                panel: {
                  rows: ['main bottom left 1', 'main bottom left 2']
                }
              }
            }
          }
        };
      }
    };
  });
  module.directive('gyPanel', function (RecursionHelper) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/panel.html',
      scope: { panel: '=' },
      controller: function ($scope) {
        $scope.mainPanelClass = function () {
          var subpanel = $scope.panel.subpanel;
          if (subpanel) {
            switch (subpanel.position) {
              case 'left': return 'gy-right';
              case 'right': return 'gy-left';
              case 'top': return 'gy-bottom';
              case 'bottom': return 'gy-top';
            }
          }
          return 'fill';
        };
        $scope.mainPanelStyle = function () {
          var subpanel = $scope.panel.subpanel;
          if (subpanel) {
            switch (subpanel.position) {
              case 'left': return { 'left': (subpanel.width + 1) + 'px' };
              case 'right': return { 'right': (subpanel.width + 1) + 'px' };
              case 'top': return { 'top': (subpanel.height + 1) + 'px' };
              case 'bottom': return { 'bottom': (subpanel.height + 1) + 'px' };
            }
          }
          return {};
        };
        $scope.subpanelClass = function () {
          var subpanel = $scope.panel.subpanel;
          if (subpanel) {
            switch (subpanel.position) {
              case 'left': return 'gy-left gy-border-right';
              case 'right': return 'gy-right gy-border-left';
              case 'top': return 'gy-top gy-border-bottom';
              case 'bottom': return 'gy-bottom gy-border-top';
            }
          }
          return '';
        };
        $scope.subpanelStyle = function () {
          var subpanel = $scope.panel.subpanel;
          if (subpanel) {
            switch (subpanel.position) {
              case 'left':
              case 'right':
                return { 'width': subpanel.width + 'px' };
              case 'top':
              case 'bottom':
                return { 'height': subpanel.height + 'px' };
            }
          }
          return {};
        };
      },
      compile: function (element) {
        return RecursionHelper.compile(element);
      }
    };
  });
})();

