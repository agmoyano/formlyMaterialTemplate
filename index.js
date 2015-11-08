(function() {
  'use strict';

  angular
    .module('formlyMaterialTemplate', [
      'ngMaterial',
      'formly',
      'ngImgCrop',
      'webcam'
    ])
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, formlyConfig, $templateCache) {
    $templateCache.put('imgSelect/imgSelect.html', '<div ng-show="state==\'crop\'" layout="column"><div layout="row" layout-align="end center" class="fabToolbar"><md-button class="md-fab md-mini" ngf-select ng-model="selected"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Subir Imagen</md-tooltip><md-icon md-font-set="material-icons">file_upload</md-icon></md-button><md-button class="md-fab md-mini" ng-click="state=\'snapshot\'"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Sacar Foto</md-tooltip><md-icon md-font-set="material-icons">camera</md-icon></md-button><md-button class="md-fab md-mini" ng-click="save()"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Aceptar</md-tooltip><md-icon md-font-set="material-icons">done</md-icon></md-button><md-button class="md-fab md-mini" ng-click="cancel()"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Cancelar</md-tooltip><md-icon md-font-set="material-icons">clear</md-icon></md-button></div><div  ngf-drop ng-model="selected" ngf-pattern="image/*" class="cropArea"><img-crop image="imageCrop || (selected | ngfDataUrl) || imageSelected" result-image="imgResult" area-type="square"></img-crop></div></div><div ng-show="state==\'snapshot\'" layout="column"><div layout="row" layout-align="end center" class="fabToolbar"><md-button class="md-fab md-mini" ngf-select ng-model="selected"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Subir Imagen</md-tooltip><md-icon md-font-set="material-icons">file_upload</md-icon></md-button><md-button class="md-fab md-mini" ng-click="cancel()"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Cancelar</md-tooltip><md-icon md-font-set="material-icons">clear</md-icon></md-button></div><webcam channel="channel" ng-click="snapshot()"></webcam></div><div ng-show="state==\'done\'" layout="column" class="static" ng-mouseenter="hovered=true" ng-mouseleave="hovered=false"><div ng-class="{show: hovered}" class="fabToolbar abs"><!--<md-fab-speed-dial  ng-class="{show: hovered}" md-direction="left" class="md-scale"><md-fab-trigger><md-button aria-label="menu" class="md-fab md-warn"><md-tooltip md-direction="bottom" md-visible="tooltipVisible">Menu</md-tooltip><md-icon md-font-set="material-icons">menu</md-icon></md-button></md-fab-trigger><md-fab-actions>--><md-button class="md-fab md-mini" ngf-select ng-model="selected"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Subir Imagen</md-tooltip><md-icon md-font-set="material-icons">file_upload</md-icon></md-button><md-button class="md-fab md-mini" ng-click="state=\'snapshot\'"><md-tooltip md-direction="bottom" md-visible="tooltipVisible" md-autohide="false">Sacar Foto</md-tooltip><md-icon md-font-set="material-icons">camera</md-icon></md-button><!--</md-fab-actions></md-fab-speed-dial>--></div><div layout="row" layout-align="center center"><img ng-src="{{image || defaultImg}}" class="done"/></div></div>');
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
                  '<md-option ng-if="options.templateOptions.options instanceof Array" ng-repeat="option in options.templateOptions.options" ng-value="option.key||option.value||option">{{option.value||option}}</md-option>'+
                  '<md-option ng-if="!(options.templateOptions.options instanceof Array)" ng-repeat="(key,value) in options.templateOptions.options" ng-value="value">{{key}}</md-option>'+
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
      types: ['select', 'selectcb'],
      template: '<label>{{to.label}}</label><md-tooltip>{{to.label}}</md-tooltip><formly-transclude></formly-transclude>'
    });

    formlyConfig.setWrapper({
      name: 'mdInputContainer',
      types: ['input', 'textarea', 'select', 'selectcb'],
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

  runBlock.$inject = ['$log', 'formlyConfig'];
})();
