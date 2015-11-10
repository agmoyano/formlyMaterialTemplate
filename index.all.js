(function() {
  'use strict';

  angular
    .module('formlyMaterialTemplate', [
      'ngMaterial',
      'formly',
      'ngImgCrop',
      'ngFileUpload',
      'webcam'
    ])
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, formlyConfig, $templateCache) {
    $templateCache.put('imgSelect/imgSelect.html', '<div ng-show="state==\'crop\'" layout="column"><div layout="row" layout-align="end center" class="fabToolbar"><md-button type="button" class="md-fab md-mini" ngf-select ng-model="selected"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Subir Imagen</md-tooltip><md-icon md-font-set="material-icons">file_upload</md-icon></md-button><md-button type="button" class="md-fab md-mini" ng-click="state=\'snapshot\'"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Sacar Foto</md-tooltip><md-icon md-font-set="material-icons">camera</md-icon></md-button><md-button type="button" class="md-fab md-mini" ng-click="save()"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Aceptar</md-tooltip><md-icon md-font-set="material-icons">done</md-icon></md-button><md-button type="button" class="md-fab md-mini" ng-click="cancel()"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Cancelar</md-tooltip><md-icon md-font-set="material-icons">clear</md-icon></md-button></div><div  ngf-drop ng-model="selected" ngf-pattern="image/*" class="cropArea"><img-crop image="imageCrop || (selected | ngfDataUrl) || imageSelected" result-image="imgResult" area-type="square"></img-crop></div></div><div ng-show="state==\'snapshot\'" layout="column"><div layout="row" layout-align="end center" class="fabToolbar"><md-button type="button" class="md-fab md-mini" ngf-select ng-model="selected"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Subir Imagen</md-tooltip><md-icon md-font-set="material-icons">file_upload</md-icon></md-button><md-button type="button" class="md-fab md-mini" ng-click="cancel()"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Cancelar</md-tooltip><md-icon md-font-set="material-icons">clear</md-icon></md-button></div><webcam channel="channel" ng-click="snapshot()"></webcam></div><div ng-show="state==\'done\'" layout="column" class="static" ng-mouseenter="hovered=true" ng-mouseleave="hovered=false"><div ng-class="{show: hovered}" class="fabToolbar abs"><!--<md-fab-speed-dial  ng-class="{show: hovered}" md-direction="left" class="md-scale"><md-fab-trigger><md-button type="button" aria-label="menu" class="md-fab md-warn"><md-tooltip md-direction="bottom" md-visible="tooltipVisible">Menu</md-tooltip><md-icon md-font-set="material-icons">menu</md-icon></md-button></md-fab-trigger><md-fab-actions>--><md-button type="button" class="md-fab md-mini" ngf-select ng-model="selected"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Subir Imagen</md-tooltip><md-icon md-font-set="material-icons">file_upload</md-icon></md-button><md-button type="button" class="md-fab md-mini" ng-click="state=\'snapshot\'"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Sacar Foto</md-tooltip><md-icon md-font-set="material-icons">camera</md-icon></md-button><!--</md-fab-actions></md-fab-speed-dial>--></div><div layout="row" layout-align="center center"><img ng-src="{{image || defaultImg}}" class="done"/></div></div>');
    $templateCache.put('formTable/formTable.html', '<div layout="column"><md-toolbar class="label md-accent"><div class="md-toolbar-tools"><h3>{{label}}</h3><span flex></span><md-button type="button" class="md-icon-button" ng-click="add()"><md-tooltip md-direction="top" md-visible="tooltipVisible" md-autohide="false">Agregar Elemento</md-tooltip><md-icon md-font-set="material-icons">add</md-icon></md-button></div></md-toolbar><md-content><div ng-if="rows.length" layout="row" ng-repeat="row in rows" ng-mouseenter="hover=true" ng-mouseleave="hover=false"><formly-form model="row" fields="fields" layout="row"/><div class="formly-field"><md-button type="button" class="md-icon-button remove" ng-class="{visible: hover}" ng-click="remove($index)"><md-icon md-font-set="material-icons">clear</md-icon></md-button></div></div><div ng-if="!rows.length" class="no-data">{{noData||\'No data\'}}</div></md-content></div>');

    formlyConfig.setType({
      name: 'image',
      template: '<img-select ng-model="model[options.key]"></img-select>'
    });

    formlyConfig.setType({
      name: 'slider',
      template: '<md-slider ng-model="model[options.key]" aria-label="{{options.templateOptions.label}}" step="{{options.templateOptions.step||0}}" md-discrete="{{options.templateOptions.discrete||false}}"></md-slider>'
    });

    formlyConfig.setType({
      name: 'table',
      template: '<form-table ng-model="model[options.key]" table-fields="options.templateOptions.fields" label="options.templateOptions.label"></form-table>'
    });

    formlyConfig.setType({
      name: 'input',
      template: '<input ng-model="model[options.key]">'
    });

    formlyConfig.setType({
      name: 'textarea',
      template: '<textarea ng-model="model[options.key]"></textarea>'
    });

    formlyConfig.setType({
      name: 'select',
      template: '<md-select ng-model="model[options.key]" placeholder="{{options.templateOptions.label}}">'+
                  //'<span ng-if="options.templateOptions.label">{{options.templateOptions.label}}</span>'+
                  '<md-option ng-repeat="option in options.templateOptions.options" ng-value="option.key||option.value||option">{{option.value||option}}</md-option>'+
                  '</md-select>'
    });

    formlyConfig.setType({
      name: 'selectObj',
      template: '<md-select ng-model="model[options.key]" placeholder="{{options.templateOptions.label}}">'+
                  //'<span ng-if="options.templateOptions.label">{{options.templateOptions.label}}</span>'+
                  '<md-option ng-repeat="(key,value) in options.templateOptions.options" ng-value="value">{{key}}</md-option>'+
                  '</md-select>'
    });

    formlyConfig.setType({
      name: 'checkbox',
      template: '<md-checkbox ng-model="model[options.key]" class="flex">{{to.label}}</md-checkbox>'
    });

    formlyConfig.setWrapper({
      name: 'mdLabel',
      types: ['input', 'textarea', 'slider'],
      template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
    });

    formlyConfig.setWrapper({
      name: 'mdSelectLabel',
      types: ['select', 'selectObj'],
      template: '<label>{{to.label}}</label><md-tooltip>{{to.label}}</md-tooltip><formly-transclude></formly-transclude>'
    });

    formlyConfig.setWrapper({
      name: 'mdInputContainer',
      types: ['input', 'textarea', 'select', 'selectObj'],
      template: '<md-input-container><formly-transclude></formly-transclude></md-input-container>'
    });

    // having trouble getting icons to work.
    // Feel free to clone this jsbin, fix it, and make a PR to the website repo: https://github.com/formly-js/angular-formly-website
    formlyConfig.templateManipulators.preWrapper.push(function(template, options) {
      if (!options.data.icon) {
        return template;
      }
      return '<md-icon class="step" md-font-icon="icon-' + options.data.icon + '"></md-icon>' + template;
    });
  }

  runBlock.$inject = ['$log', 'formlyConfig', '$templateCache'];
})();
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
