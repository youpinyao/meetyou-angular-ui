import './index.scss';

const controller = 'switchCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.selectSwitch = true;
}

export default {
  template: require('./index.html'),
  controller,
};