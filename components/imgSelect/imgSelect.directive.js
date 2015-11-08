(function() {
  'use strict';

  angular
    .module('formlyMaterialTemplate')
    .directive('imgSelect', imgSelect);

  /** @ngInject */
  function imgSelect(Upload, $filter) {
    var directive = {
      restrict: 'E',
      templateUrl: 'imgSelect/imgSelect.html',
      scope: {
        image: '=ngModel'
      },
      controller: ['$scope', '$filter', function($scope, $filter) {
        $scope.state = 'done';
        $scope.imgResult = '';
        $scope.selected = null;
        $scope.imageSelected = $scope.image;

        $scope.leave = function() {
          $scope.hovered=false;
          $scope.menuOpen=false;
        }
        $scope.save = function() {
          $scope.selected = null;
          $scope.image = $scope.imgResult;
          $scope.imageSelected = $scope.image;
          $scope.state = 'done';
        }

        $scope.cancel = function() {
          $scope.selected = null;
          $scope.image = $scope.imageSelected;
          $scope.state = 'done';
        }

        $scope.snapshot = function() {
          var video = $scope.channel.video;
          var hiddenCanvas = document.createElement('canvas');
          hiddenCanvas.width = video.width;
          hiddenCanvas.height = video.height;
          var ctx = hiddenCanvas.getContext('2d');
          ctx.drawImage(video, 0, 0, video.width, video.height);
          $scope.imageCrop = hiddenCanvas.toDataURL();
          $scope.state = 'crop';
        }
      }],
      link: function(scope, element, attrs) {
        var disabled = attrs.disabled;
        element.css('display', 'block');
        element.css('width') == '0px' && element.css('width', '160px');
        element.css('height') == '0px' && element.css('height', '160px');
        element.find('.cropArea').css({width: element.css('width'), height: element.css('height')});
        scope.defaultImg = 'app/components/imgSelect/nophoto.png';

        if(!disabled) {
          element.on('blur', function() {
            element.removeClass('ng-pristine').addClass('ng-dirty');
          })
        }

        scope.$watch('selected', function(value) {
          if(value && (!value.hasOwnProperty('length') || value.length)) {
            scope.state = 'crop';
            //scope.imageCrop = $filter('ngfDataUrl')(value);
          }
        });

        /*scope.$watch(ngModel, function(value) {
          scope.image = value||'';
          scope.imageSelected = scope.image;
        });*/
      }
    };
    return directive;
  }
  imgSelect.$inject = ['Upload', '$filter'];
})();
