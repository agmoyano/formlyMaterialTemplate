(function() {
  'use strict';

  angular
    .module('formlyMaterialTemplate')
    .directive('imgSelect', imgSelect);

  /** @ngInject */
  function imgSelect($filter) {
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
        scope.defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAYFBMVEW+vr66urrR0dHi4uL9/f3BwcHOzs7U1NTKysrd3d2ysrLt7e34+Pj7+/u0tLTa2trp6enr6+vl5eW3t7fw8PDY2NjExMT19fXZ2dnz8/Pn5+f29vbg4ODNzc2wsLD////M0F1BAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3woQERsLFhWQMQAAAwlJREFUeNrt2tl2mzAQBmAEYrHMZoMBYwzv/5ZJWxZRC+EWazk5/1wqCv6CLBjNxBksDwdAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAHcilMvDlbbAbyzEUSqMSZhZQWQ+pPnNg3N9/BqAzDrt4FFws98kDliJcDa+xPiBRYBe5efGi7jJyXAYLz6aoGd5VPDegxun5y5qcUy7igBFgLgrZeHv0y98uMqgPQyBj/o7cUy9SIe/gAwuTY3BZHl9CPA2GW9okgbehx4J73C8OOjwFip71tIDwKjXnHcjgFL1b4+PQZslAP7Y8DIdmD1c4GpvUDiduWvxxut27BitgGZe15d4HEiNgFZ+PpmoB6xBuiU4jQotAQYbr628sICIDv9X8qhDSg/wcWOaeD6/iXfJ5P1frkXZoEBf/pr/N+PPxLk3OiFmQSS5QBcPzmJkwtPnZ8DZsF7sTydvb/ecdFMp1ElCs3Vrdfb5MSHLrgDjOt34iFdxkWYiH5Zx3cwEp7N+5ciV25qk7TT/U53HkHEDDCdXnHu1oRE8g3QAJxWON5M/jLJGmsAZjul4KWYlZgB5vuTJV9CDcDpSZHuAysjwHEL1G9kpYER4JSvWAv8hzv4NAK8j8lAb+t38PL+JjGzi73dQg4btv8GDcBwSgU3Z0zpwsPMg3p+T2yucTfO6AxlM/VONZFQyeV0AKd0ihJ5OpYwQ8A5Iy2F+czcsPOMnepyGaGi0husBejMVZn2ZaM8qbwzr+dcvPTeynWNI82E3U7twII7W3oLMXW5cddo6WPVMSqbyCdO5bb8YGe4eBTsfNBWaUZf+S2Ut6wK8xXWKNm+TpvaUALe7q02lhTRi5OwSl1W9vRJyGshuH7a1WkiId+LiLtor9dkoFdHnrcuP1+87J1OGLqdAMp/7NoOvNoOpIVqn3+wDeEp9rHz0T5JqBbYHf3XqGHImDpe0Q7HgcMjdNSsrp8lwyeAZgNAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAH8o8AsXPN4Mak5ttgAAAABJRU5ErkJggg==';

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
  imgSelect.$inject = ['$filter'];
})();
