
import 'lightgallery.js/dist/css/lightgallery.css';
import './src/_lightgallery.scss';
import moduleName from './src/name.js';

angular.module(moduleName, []).config(function () {}).run(function () {});

require('./src/directive.js');
require('./src/service.js');

export default moduleName;
