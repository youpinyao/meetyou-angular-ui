const controller = 'feedbackCtrl';


angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = [];
function mainCtrl() {

}

export default {
  template: require('./index.html'),
  controller,
};
