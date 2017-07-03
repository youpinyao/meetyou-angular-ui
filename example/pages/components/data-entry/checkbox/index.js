import './index.scss';

const controller = 'checkboxCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval'];

function mainCtrl($scope, $timeout, $interval) {
  $scope.selectCheckbox = '1';
}

export default {
  template: require('./index.html'),
  controller,
};