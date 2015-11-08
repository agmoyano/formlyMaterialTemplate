(function() {
  'use strict';

  angular
    .module('formlyMaterialTemplate')
    .directive('formTable', formTable);

  /** @ngInject */
  function formTable($filter) {
    var directive = {
      restrict: 'E',
      templateUrl: 'formTable/formTable.html',
      scope: {
        rows: '=ngModel',
        fields: '=tableFields',
        label: '=',
        noData: '='
      },
      controller: ['$scope', function($scope) {
        !$scope.rows && ($scope.rows = []);
        $scope.add = function() {
          $scope.rows.push({});
        }
        $scope.remove = function(index) {
          $scope.rows.splice(index,1);
        }
      }],
      link: function(scope, element, attrs) {

      }
    };
    return directive;
  }
  formTable.$inject = ['$filter'];
})();
