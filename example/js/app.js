import './vendor.js';
import meetAngularUI from '../../src';

const app = angular.module('app', [
  meetAngularUI,
  'ui.router',
]);
const routerConfig = require('./routerConfig.js');

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
run.$inject = ['$rootScope'];

app.config(config).run(run);
angular.bootstrap(document, ['app']);

function run($rootScope) {
  $rootScope.routerConfig = routerConfig;
}

function config($stateProvider, $urlRouterProvider, $httpProvider) {
  angular.forEach(routerConfig, function (value) {
    $stateProvider
      .state(value.state, {
        url: value.url,
        template: value.template,
        templateUrl: value.templateUrl,
        controller: value.controller,
      });
  });
  $urlRouterProvider.otherwise(routerConfig[0].state);
}

