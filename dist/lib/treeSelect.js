webpackJsonp([2,9,25,29,30],{

/***/ "+Ovo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = __webpack_require__("YkQ5");

var _name = __webpack_require__("g5ku");

var _name2 = _interopRequireDefault(_name);

var _maInputTpl = __webpack_require__("6vUj");

var _maInputTpl2 = _interopRequireDefault(_maInputTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maInput', maInput).directive('maNum', maNum);

maInput.$inject = [];

function maInput() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      name: '@name',
      type: '@type',
      model: '=ngModel',

      maxlength: '@maxlength',
      placeholder: '@placeholder',
      accept: '@accept',
      min: '@min',
      max: '@max',
      step: '@step',
      readonly: '=ngReadonly',
      disabled: '=ngDisabled',

      iconClick: '&maIconClick',

      clear: '=maClear',

      ngChange: '&ngChange',
      ngBlur: '&ngBlur'
    },
    template: _maInputTpl2['default'],
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function ($scope, $element) {
      this.clearClick = function () {
        $scope.model = '';
      };
      $scope.$watch('placeholder', function (d) {
        $element.find('textarea').attr('placeholder', d || '');
      });

      $scope.change = function () {
        $scope.ngChange({
          $model: $scope.model
        });
      };

      $scope.blur = function () {
        var evObj = document.createEvent('MouseEvents');

        evObj.initEvent('blur', true, false);
        $element[0].dispatchEvent(evObj);

        $scope.ngBlur({
          $model: $scope.model
        });
      };
    }],
    link: function link(scope, element, attrs, ctrl) {
      (0, _jquery2['default'])(element).bind('click', function (e) {
        if (e.eventPhase === 2) {
          scope.iconClick({
            $event: e
          });
        }
      });
    }
  };
}

maNum.$inject = ['$filter', '$timeout', '$parse'];

function maNum($filter, $timeout, $parse) {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs, controller) {
      var decimal;
      var ngModel = $parse(attrs.ngModel);
      var min = parseFloat(attrs.min);
      var max = parseFloat(attrs.max);

      attrs.$observe('min', function (d) {
        min = d || undefined;
      });
      attrs.$observe('max', function (d) {
        max = d || undefined;
      });
      attrs.$observe('maDecimal', function (d) {
        getDecimal(d);
      });

      getDecimal(attrs.maDecimal);

      function getDecimal(maDecimal) {
        decimal = maDecimal !== undefined;

        if (!isNaN(parseInt(maDecimal, 10))) {
          decimal = parseInt(maDecimal, 10);
        }

        if (decimal === 0 || maDecimal === '') {
          decimal = false;
        }

        if (decimal === true) {
          decimal = 2;
        }
      }

      if (elem[0].tagName.toLowerCase() !== 'input') {
        elem.find('input').bind('keyup', keyup);
      } else {
        elem.bind('keyup', keyup);
      }

      function keyup(e) {
        var _this = this;

        var v = this.value + '';

        v = v.split('');

        var str = [];
        var decimalCount = 0;

        if (v[0] === '-' && v.length === 1 || (decimal ? v.join('') === '0.' + Array(decimal - 1).fill('0').join('') : false)) {
          // 为一个负号时不处理
          str = v;
        } else {
          angular.forEach(v, function (d, k) {
            if (decimal && d == '。') {
              d = '.';
            }

            if (k !== 0 && d == '.' && decimalCount === 0) {
              str.push(d);
              decimalCount++;
            }

            if (!isNaN(parseInt(d, 10))) {
              str.push(d);
            }

            if (k === 0 && d === '-') {
              str.push(d);
            }
          });

          if (str[str.length - 1] !== '.' && (!isNaN(min) || !isNaN(max))) {
            str = parseFloat(str.join(''));

            if (isNaN(str)) {
              str = '';
            }

            if ((str || str === 0) && !isNaN(min) && str < min) {
              str = min;
            }
            if ((str || str === 0) && !isNaN(max) && str > max) {
              str = max;
            }

            str = (str + '').split('');
          }
        }

        $timeout(function () {
          _this.value = str.join('') || '';

          if (!isNaN(decimal) && _this.value && _this.value.split('.')[1] && _this.value.split('.')[1].length > decimal) {
            _this.value = parseFloat(_this.value).toFixed(decimal);
          }

          if (ngModel && typeof ngModel.assign === 'function') {
            ngModel.assign(scope, _this.value);
          }
        });
      }
    }
  };
}

/***/ }),

/***/ "+VfW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.utils';

/***/ }),

/***/ "/cD4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("brJl");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("qSUM");

exports['default'] = _name2['default'];

/***/ }),

/***/ "2hwL":
/***/ (function(module, exports) {

module.exports = "<li class=\"ui-select-choices-row {{'tree-level-' +item&&{index}._treeLevel}}\"\n  ng-class=\"{'has-sub' : item&&{index}.sub.length, 'search-match': item&&{index}.__search_match}\"\n  data-tag-to=\"{{item&&{index}._treeLinkTo}}\"\n  ng-if=\"item&&{index}.__item_is_show\"\n  data-tag-from=\"{{item&&{index}._treeLinkFrom}}\" ng-cloak>\n  <div class=\"select2-result-label ui-select-choices-row-inner\"\n    ma-click=\"$select.doSelect($event, item&&{index})\">\n    <div ng-class=\"{'tree-open': item&&{index}.__tree_is_open}\">\n\n      <i class=\"tree-arrow-click\"\n        ng-if=\"item&&{index}.sub.length\"\n        ma-click=\"$select.toggleTree($event, item&&{index})\">\n        <i class=\"tree-arrow\"></i>\n      </i>\n      <!-- <div class=\"click-mask\"></div> -->\n      <ma-checkbox unclick\n        ng-model=\"item&&{index}._selected\"\n        style=\"pointer-events:none;\"\n        ng-disabled=\"$select.selectDisabled\"\n        ng-class=\"{\n          'has-sub': item&&{index}.__checkbox_has_sub,\n          'has-parent': item&&{index}.__checkbox_has_parent,\n          'custom-multi-select-checkbox-hidden': item&&{index}.hiddenCheck\n        }\">\n        <span ng-bind-html=\"item&&{index}.text\"></span>\n      </ma-checkbox>\n    </div>\n  </div>\n</li>\n";

/***/ }),

/***/ "6vUj":
/***/ (function(module, exports) {

module.exports = "<div class=\"ma-input\">\n  <input\n    ng-show=\"type !== 'textarea'\"\n    type=\"{{type || 'text'}}\"\n    ng-model=\"model\"\n    maxlength=\"{{maxlength}}\"\n    placeholder=\"{{placeholder}}\"\n    accept=\"{{accept}}\"\n    min=\"{{min}}\"\n    max=\"{{max}}\"\n    step=\"{{step}}\"\n    ng-readonly=\"readonly\"\n    ng-change=\"change()\"\n    ng-blur=\"blur()\"\n    ng-disabled=\"disabled\"\n  />\n\n  <textarea\n    ng-show=\"type === 'textarea'\"\n    type=\"{{type || 'text'}}\"\n    ng-model=\"model\"\n    maxlength=\"{{maxlength}}\"\n    accept=\"{{accept}}\"\n    min=\"{{min}}\"\n    max=\"{{max}}\"\n    step=\"{{step}}\"\n    ng-change=\"change()\"\n    ng-blur=\"blur()\"\n    ng-readonly=\"readonly\"\n    ng-disabled=\"disabled\"\n  ></textarea>\n\n  <ma-icon\n    class=\"clear\"\n    ng-show=\"clear && model\"\n    ma-type=\"close\"\n    ma-click=\"$ctrl.clearClick($event)\"\n  ></ma-icon>\n\n  <div ng-transclude></div>\n</div>\n";

/***/ }),

/***/ "76nD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.treeSelect';

/***/ }),

/***/ "Cs5U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("g5ku");

var _name2 = _interopRequireDefault(_name);

var _icons = __webpack_require__("/cD4");

var _icons2 = _interopRequireDefault(_icons);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

__webpack_require__("MHen");

__webpack_require__("gU1X");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], [_icons2['default'], _button2['default'], 'validation', 'validation.rule']).config(function () {}).run(function () {});

__webpack_require__("+Ovo");

exports['default'] = _name2['default'];

/***/ }),

/***/ "FR6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("HuZX");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maCheckbox', maCheckbox);

maCheckbox.$inject = ['$timeout'];

function maCheckbox($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: '<label class="ma-checkbox">\n    <input type="checkbox"\n      value="{{value}}"\n      data-name="{{name}}"\n      ng-disabled="disabled"\n      ng-change="change()"\n      ng-model="checked"\n    />\n    <i class="ma-checkbox-appearance"></i>\n    <span ng-transclude></span>\n    </label>',
    scope: {
      name: '@name',
      value: '@value',
      model: '=ngModel',
      ngChange: '&ngChange',
      disabled: '=ngDisabled'
    },
    link: function link(scope, element, attrs, ctrl) {
      scope.$watch('model', function (d) {
        if (angular.isArray(d)) {
          scope.checked = false;
          angular.each(d, function (v, k) {
            if (String(v) === element.find('input').val() || v === true) {
              scope.checked = true;
            }
          });
        } else if (String(d) === element.find('input').val() || d === true) {
          scope.checked = true;
        } else {
          scope.checked = false;
        }
      });

      scope.change = function () {
        scope.ngChange({
          $model: scope.model,
          $checked: scope.checked
        });
      };

      attrs.$observe('unclick', function () {
        element.bind('click', function (e) {
          e.preventDefault();
        }).find('input').bind('click', function (e) {
          e.preventDefault();
        });
      });

      scope.$watch('checked', function (d) {
        scope.$applyAsync(function () {
          var checkboxs = (0, _jquery2['default'])(element).parent().find('> .ma-checkbox input[type="checkbox"]');
          var values = [];

          if (scope.name) {
            checkboxs = (0, _jquery2['default'])('input[data-name="' + scope.name + '"][type="checkbox"]');
          }

          if (!checkboxs.length) {
            checkboxs = (0, _jquery2['default'])(element).find('input');
          }

          checkboxs.each(function () {
            if (this.checked) {
              values.push(this.value || true);
            }
          });
          if (checkboxs.length === 1) {
            scope.model = values[0] || false;
          } else {
            scope.model = values;
          }
        });
      });
    }
  };
}

/***/ }),

/***/ "HuZX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.checkbox';

/***/ }),

/***/ "K4Cz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("76nD");

var _name2 = _interopRequireDefault(_name);

var _util = __webpack_require__("akj6");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).factory('$treeSelect', treeSelect);

treeSelect.$inject = [];

function treeSelect() {
  return _util2['default'];
}

/***/ }),

/***/ "S1RN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _name = __webpack_require__("g66R");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maClick', maClick).directive('maButton', maButton);

maClick.$inject = ['$parse', '$timeout'];

function maClick($parse, $timeout) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs, ctrl) {
      (0, _jquery2['default'])(element).bind('click', function (e) {
        if (element.hasClass('ma-click-disabled') || element.hasClass('disabled')) {
          return;
        }
        element.addClass('ma-click-disabled');

        if (attrs.maClick) {
          scope.$event = e;
          scope.$args = arguments;
          $parse(attrs.maClick)(scope);
        }

        $timeout();

        $timeout(function () {
          element.removeClass('ma-click-disabled');
        }, parseInt(attrs.delay, 10) || 50);
      });
    }
  };
}

maButton.$inject = [];

function maButton() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div\n    class="ma-button {{size}} {{type}}"\n    ng-class="{\n      disabled: disabled,\n      flat: flat === \'true\',\n      active: active === \'true\',\n      loading: loading === \'true\',\n    }" ng-transclude></div>',
    scope: {
      size: '@maSize',
      type: '@maType',
      flat: '@maFlat',
      active: '@maActive',
      loading: '@maLoading',
      disabled: '=ngDisabled'
    },
    replace: true,
    link: function link(scope, element, attrs, ctrl) {}
  };
}

/***/ }),

/***/ "UX8a":
/***/ (function(module, exports) {

module.exports = "<svg\n  class=\"ma-circle\"\n>\n  <circle\n    fill=\"none\"\n  ></circle>\n  <circle\n    fill=\"none\"\n  ></circle>\n</svg>\n";

/***/ }),

/***/ "VPel":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _name = __webpack_require__("76nD");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _debounce = __webpack_require__("HhAh");

var _debounce2 = _interopRequireDefault(_debounce);

var _multiSelectTpl = __webpack_require__("Vm7e");

var _multiSelectTpl2 = _interopRequireDefault(_multiSelectTpl);

var _itemTpl = __webpack_require__("2hwL");

var _itemTpl2 = _interopRequireDefault(_itemTpl);

__webpack_require__("x+N3");

__webpack_require__("akj6");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maTreeSelect', maTreeSelect).directive('maCmultiselect', cmultiselect);

maTreeSelect.$inject = ['$treeSelect'];

function maTreeSelect($treeSelect) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="ma-tree-select">\n      <ma-cmultiselect\n        tree\n        ng-model="model"\n        ng-items="newItems"\n        search-enabled="search"\n        limit="{{limit}}"\n        ng-disabled="disabled"\n        placeholder="{{placeholder}}"\n        clear="{{clear}}"\n        static="{{static}}"\n      >\n      </ma-cmultiselect>\n    </div>',
    scope: {
      model: '=ngModel',
      maModel: '=maModel',
      name: '@name',
      search: '@maSearch',
      items: '=maData',
      limit: '@maLimit',
      disabled: '=ngDisabled',
      placeholder: '@maPlaceholder',
      textKey: '@maTextKey',
      valueKey: '@maValueKey',
      subKey: '@maSubKey',
      clear: '@maClear',
      'static': '@maStatic'
    },
    controller: ['$scope', '$element', function ($scope, $element) {
      $scope.newItems = [];

      $scope.$watch('items', function (data) {
        var newItems = [];

        angular.each(data, function (d) {
          newItems.push(d);
          setContent(newItems[newItems.length - 1]);
        });

        $scope.newItems = newItems;

        function setContent(item) {
          item.text = item[$scope.textKey];
          item.value = item[$scope.valueKey];
          item.sub = item[$scope.subKey];

          if (item.sub && item.sub.length) {
            angular.each(item.sub, function (dd) {
              setContent(dd);
            });
          }
        }
      });

      $scope.$watch('model', function (d) {
        // 设置带父级的model数据
        if ((0, _jquery2['default'])($element).attr('ma-model')) {
          $scope.maModel = getWithParent(d);
        }
      });

      function getWithParent(data) {
        var selected = [];
        var selectedIds = [];

        if (data && data.length) {
          angular.each(data, function (d) {
            if (selectedIds.indexOf(d.value) === -1) {
              selected.push(d);
              selectedIds.push(d.value);
            }
            setParent(d);
          });
        }

        return selected;

        function setParent(d) {
          if (d._parent) {
            if (selectedIds.indexOf(d._parent.value) === -1) {
              selected.push(d._parent);
              selectedIds.push(d._parent.value);
            }
            setParent(d._parent);
          }
        }
      }
    }],
    link: function link(scope, element, attrs, ctrl) {
      scope.textKey = attrs.maTextKey || 'text';
      scope.valueKey = attrs.maValueKey || 'value';
      scope.subKey = attrs.maSubKey || 'sub';

      attrs.$observe('maTextKey', function (d) {
        scope.textKey = d || 'text';
      });
      attrs.$observe('maValueKey', function (d) {
        scope.valueKey = d || 'value';
      });
      attrs.$observe('maSubKey', function (d) {
        scope.subKey = d || 'sub';
      });
    }
  };
}

cmultiselect.$inject = ['$parse', '$window', '$document', '$timeout'];

function cmultiselect($parse, $window, $document, $timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      selectDisabled: '=ngDisabled',
      'static': '@static',
      ngModel: '=ngModel',
      ngItems: '=ngItems'
    },
    replace: true,
    template: _multiSelectTpl2['default'],
    controllerAs: '$select',
    link: function link(scope, element, attrs, controller) {
      var $select = scope.$select;

      $select._multiselectId = angular.uuid();
      element.attr('data-id', $select._multiselectId);

      element.bind('click', function (e) {
        // e.stopPropagation();
      });

      attrs.$observe('tree', function (d) {
        scope.$select.isTree = true;
      });

      attrs.$observe('clear', function (d) {
        scope.$select.clear = d;
      });

      attrs.$observe('static', function (d) {
        scope.$select.isStatic = d == 'true';
      });

      // attrs.$observe('ngItems', function(d) {
      //   scope.$select.selectItems = $parse(d)(scope.$parent);
      // })
      attrs.$observe('searchEnabled', function (d) {
        scope.$select.searchEnabled = $parse(d)(scope.$parent);
      });

      attrs.$observe('limit', function (d) {
        scope.$select.limit = parseInt($parse(d)(scope.$parent), 10);
      });

      attrs.$observe('placeholder', function (d) {
        scope.$select.placeholder = d;
      });

      // 计算位置
      var dropdown = null;
      var directionUpClassName = 'direction-up';

      var setDropdownPosUp = function setDropdownPosUp(offset, offsetDropdown) {
        offset = offset || uisOffset(element);
        offsetDropdown = offsetDropdown || uisOffset(dropdown);

        dropdown[0].style.position = 'absolute';
        dropdown[0].style.top = offsetDropdown.height * -1 + 'px';
        element.addClass(directionUpClassName);
      };

      var uisOffset = function uisOffset(element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      };

      var setDropdownPosDown = function setDropdownPosDown(offset, offsetDropdown) {
        element.removeClass(directionUpClassName);

        offset = offset || uisOffset(element);
        offsetDropdown = offsetDropdown || uisOffset(dropdown);

        dropdown[0].style.position = '';
        dropdown[0].style.top = '';
      };

      var calculateDropdownPosAfterAnimation = function calculateDropdownPosAfterAnimation() {
        // Delay positioning the dropdown until all choices have been added so its height is correct.
        $timeout(function () {
          if ($select.dropdownPosition === 'up') {
            // Go UP
            setDropdownPosUp();
          } else {
            // AUTO
            element.removeClass(directionUpClassName);

            var offset = uisOffset(element);
            var offsetDropdown = uisOffset(dropdown);

            // https://code.google.com/p/chromium/issues/detail?id=342307#c4
            var scrollTop = $document[0].documentElement.scrollTop || $document[0].body.scrollTop; // To make it cross browser (blink, webkit, IE, Firefox).

            // Determine if the direction of the dropdown needs to be changed.
            if (offset.top + offset.height + offsetDropdown.height > scrollTop + $document[0].documentElement.clientHeight) {
              // Go UP
              setDropdownPosUp(offset, offsetDropdown);
            } else {
              // Go DOWN
              setDropdownPosDown(offset, offsetDropdown);
            }
          }

          // Display the dropdown once it has been positioned.
          dropdown[0].style.opacity = 1;
        });
      };

      // var opened = false;

      scope.calculateDropdownPos = function () {
        // if ($select.open) {
        dropdown = angular.element(element).querySelectorAll('.ui-select-dropdown');

        if (dropdown.length === 0) {
          return;
        }

        // Hide the dropdown so there is no flicker until $timeout is done executing.
        // if ($select.search === '' && !opened) {
        //   dropdown[0].style.opacity = 0;
        //   opened = true;
        // }

        if (!uisOffset(dropdown).height && $select.$animate && $select.$animate.on && $select.$animate.enabled(dropdown)) {
          var needsCalculated = true;

          $select.$animate.on('enter', dropdown, function (elem, phase) {
            if (phase === 'close' && needsCalculated) {
              calculateDropdownPosAfterAnimation();
              needsCalculated = false;
            }
          });
        } else {
          calculateDropdownPosAfterAnimation();
        }
        // } else {
        //   if (dropdown === null || dropdown.length === 0) {
        //     return;
        //   }

        //   // Reset the position of the dropdown.
        //   dropdown[0].style.opacity = 0;
        //   dropdown[0].style.position = '';
        //   dropdown[0].style.top = '';
        //   element.removeClass(directionUpClassName);
        // }
      };
    },
    controller: ['$scope', '$timeout', '$compile', '$element', function ($scope, $timeout, $compile, $element) {
      var _this2 = this;

      var _this = this;
      var $select = this;
      var updateStatus = (0, _debounce2['default'])(_updateStatus, 0);
      var updateHtmlItems = (0, _debounce2['default'])(_updateHtmlItems, 0);

      this.searchEnabled = false;

      this.open = false;

      this.disabled = false;

      this.search = '';

      this.openedItems = [];

      function bodyClick(e) {
        if (_this._multiselectId != (0, _jquery2['default'])(e.target).parents('.custom-multi-select').attr('data-id') || (0, _jquery2['default'])(e.target).hasClass('select2-choices')) {
          $scope.$applyAsync(function () {
            _this.open = false;
          });
        }
      }

      $scope.$on('$destroy', function () {
        (0, _jquery2['default'])('body').unbind('click', bodyClick);
      });

      (0, _jquery2['default'])('body').bind('click', bodyClick);

      $scope.$watch('selectDisabled', function (d) {
        $scope.$select.selectDisabled = d;
      });

      $scope.$watch('ngItems', function (d, p) {
        var items = _jquery2['default'].extend([], d);
        var newItems = [];

        function getSub(items, parentItem, treeLevel) {
          angular.forEach(items, function (item) {
            newItems.push(item);

            item._treeLevel = treeLevel;

            if (item.sub && item.sub.length) {
              item.tagId = parentItem ? parentItem.tagId + '_' + angular.uuid() : 'treeTag_' + angular.uuid();
              item._treeLinkTo = item.tagId;
              angular.forEach(item.sub, function (it) {
                it._parent = item;
                it._treeLinkFrom = item.tagId;
              });
              getSub(item.sub, item, treeLevel + 1);
            }
          });
        }
        getSub(items, null, 0);

        $scope.$select.selectItems = newItems;

        $scope.$select.fixSelected();
        updateHtmlItems();
      });

      $scope.$watch('ngModel', function (d, p) {
        if ($scope.isFixSelected) {
          return;
        }

        $scope.$select.fixSelected();

        var hasOther = false;

        function setSelectedFalse(items) {
          angular.forEach(items, function (d) {
            d._selected = false;
            if (d.sub && d.sub.length) {
              setSelectedFalse(d.sub);
            }
          });
        }

        setSelectedFalse($scope.$select.selectItems);

        angular.forEach(d, function (dd) {
          if (angular.isObject(dd)) {
            dd._selected = true;
          } else {
            hasOther = true;
          }
        });

        if (hasOther) {
          return;
        }

        updateStatus();
      });

      this.fixSelected = function () {
        // 纠正选中值
        if ($scope.ngModel && $scope.ngModel.length && !$scope.ngModel[0].$$hashKey) {
          $scope.$applyAsync(function () {
            var selectValues = [];

            angular.forEach($scope.ngModel, function (d) {
              selectValues.push((typeof d === 'undefined' ? 'undefined' : _typeof(d)) !== 'object' ? d : d.value);
            });

            var ngModel = [];

            angular.forEach(_this2.selectItems, function (d) {
              if (selectValues.indexOf(d.value) !== -1) {
                ngModel.push(d);
                d._selected = true;
              }
            });

            $scope.ngModel = ngModel;
          });
          $scope.isFixSelected = true;
          $timeout(function () {
            $scope.isFixSelected = false;
          });
        }

        updateStatus();
      };

      this.clearSelect = function () {
        $scope.ngModel = undefined;
        _this2.open = false;
      };

      this.showSelect = function () {
        if ($scope.selectDisabled) {
          return;
        }

        if (_this2.open) {
          return;
        }
        if (_this2.isStatic) {
          return;
        }

        _this2.search = '';

        $scope.calculateDropdownPos();
        $timeout(function () {
          _this2.open = true;
        }, 50);
      };

      this.removeChoice = function (item, $event) {
        $event.stopPropagation();

        var newSelected = [];
        angular.forEach($scope.ngModel, function (d, k) {
          if (d !== item) {
            newSelected.push(d);
          }
        });

        $scope.ngModel = newSelected;
      };

      this.getParents = function (item) {
        var parents = [];

        function getParent(p) {
          if (p) {
            parents.push(p);
            getParent(p._parent);
          }
        }

        getParent(item._parent);

        return parents;
      };

      this.doSelect = function ($event, item) {
        if ($select.selectDisabled) {
          return;
        }

        if (item.hiddenCheck) {
          _this2.toggleTree($event, item);
          return;
        }

        var isIn = false;
        var newSelected = [];

        angular.forEach($scope.ngModel, function (d, k) {
          if (d === item) {
            isIn = true;
          } else {
            newSelected.push(d);
          }
        });

        if (_this2.limit == 1) {
          newSelected = [];
        }
        if (!_this2.limit || _this2.limit && _this2.limit > newSelected.length) {
          // remove sub
          if (item.sub && item.sub.length) {
            newSelected = _this2.removeSub(item, newSelected);
          }

          if (!isIn && !_this2.hasParentSelect(item)) {
            newSelected.push(item);
          }

          if (_this2.hasParentSelect(item)) {
            newSelected = _this2.addOtherItem(item, newSelected);
            newSelected = _this2.removeParent(item, newSelected);
          }

          if (item._parent && !isIn) {
            // console.log('same all check');

            newSelected = _this2.sameAllCheck(item, newSelected);
          }
        }

        $scope.ngModel = newSelected;
      };

      this.sameAllCheck = function (item, newSelected) {
        var count = 0;
        var doAdd = false;
        var showSubCount = 0;

        if (item._parent && newSelected.indexOf(item._parent) == -1) {
          angular.forEach(item._parent.sub, function (d) {
            if (newSelected.indexOf(d) !== -1) {
              count++;
            }
            if (d.isHidden !== true) {
              showSubCount++;
            }
          });

          if (showSubCount && count >= showSubCount && !item._parent.hiddenCheck) {
            newSelected.push(item._parent);
            newSelected = _this2.removeSub(item._parent, newSelected);
            doAdd = true;
          }
        }

        if (doAdd && item._parent._parent) {
          newSelected = _this2.sameAllCheck(item._parent, newSelected);
        }

        return newSelected;
      };

      this.addOtherItem = function (item, newSelected) {
        var parents = _this2.getParents(item);
        var parent = null;

        angular.forEach(parents, function (d) {
          if (newSelected.indexOf(d) !== -1) {
            parent = d;
          }
        });

        function selectSub(parent) {
          angular.forEach(parent.sub, function (d) {
            if (d !== item && parent !== item && parent._parent !== item._parent && d.isHidden !== true) {
              newSelected.push(d);
            }
            if (d.sub && d !== item) {
              selectSub(d);
            }
          });
        }

        selectSub(parent);

        return newSelected;
      };

      this.removeSub = function (item, newSelected) {
        var subs = [];

        function getSub(sub) {
          angular.forEach(sub, function (d) {
            subs.push(d);
            if (d.sub && d.sub.length) {
              getSub(d.sub);
            }
          });
        }

        getSub(item.sub);

        var nnList = [];

        angular.forEach(newSelected, function (d, k) {
          if (subs.indexOf(d) == -1) {
            nnList.push(d);
          }
        });

        return nnList;
      };

      this.removeParent = function (item, newSelected) {
        var nList = [];
        var parents = _this2.getParents(item);

        angular.forEach(newSelected, function (d, k) {
          if (parents.indexOf(d) == -1) {
            nList.push(d);
          }
        });

        return nList;
      };

      this.stopp = function (e) {
        e.stopPropagation();
      };

      this.toggleTree = function ($event, item) {
        _this2.stopp($event);

        if (_this2.openedItems.indexOf(item._treeLinkTo) != -1) {
          _this2.openedItems.splice(_this2.openedItems.indexOf(item._treeLinkTo), 1);
        } else {
          _this2.openedItems.push(item._treeLinkTo);
        }

        _this2.openedItems = angular.extend([], _this2.openedItems);

        updateStatus();
      };

      this.hasSubNotHidden = function (item) {
        var subHidden = function subHidden(sub) {
          var ret = false;
          angular.forEach(sub, function (d) {
            if (d.isHidden !== true) {
              ret = true;
            } else if (d.sub && d.sub.length) {
              ret = subHidden(d.sub) === true ? true : ret;
            }
          });
          return ret;
        };

        if (item && item.sub && item.sub.length) {
          return subHidden(item.sub);
        }
        return false;
      };

      this.treeIsOpen = function (tagId) {
        if (!tagId) {
          return false;
        }

        tagId = tagId.split('_');
        var count = 0;
        var tagStart = tagId[0];
        for (var i = 1; i < tagId.length; i++) {
          tagStart += '_' + tagId[i];
          if (_this2.openedItems.indexOf(tagStart) != -1) {
            count++;
          }
        }

        return count >= tagId.length - 1;
      };

      this.hasSubSelected = function (item) {
        var has = false;

        var subSlected = function subSlected(item) {
          angular.forEach(item.sub, function (d) {
            if ($scope.ngModel && $scope.ngModel.length && $scope.ngModel.indexOf(d) !== -1) {
              has = true;
            }

            if (d.sub) {
              subSlected(d);
            }
          });
        };

        subSlected(item);

        return has;
      };

      this.hasParentSelect = function (item) {
        var has = false;
        var parentSlected = function parentSlected(item) {
          if (item._parent && $scope.ngModel && $scope.ngModel.length && $scope.ngModel.indexOf(item._parent) !== -1) {
            has = true;
          }

          if (item._parent && item._parent._parent) {
            parentSlected(item._parent);
          }
        };
        parentSlected(item);

        return has;
      };

      $scope.$watch('$select.search', function (d, p) {
        if (d === p) {
          return;
        }
        angular.forEach(_this2.selectItems, function (item) {
          if (d && (item.text + '').indexOf(d) === -1) {
            item.searchHidden = true;
          } else {
            item.searchHidden = false;
          }
        });
        updateStatus();
      });

      function _updateHtmlItems() {
        var htmlItems = '';
        var target = (0, _jquery2['default'])($element).find('.ui-select-choices-content');
        var index = -1;

        angular.each($select.selectItems, function (item) {
          updateItem(item);

          if (item.isHidden !== true || $select.hasSubNotHidden(item)) {
            index++;
            var itemElement = _itemTpl2['default'].replace(/&&\{index\}/g, index);

            $scope['item' + index] = item;
            htmlItems += itemElement;
            // target.append(itemElement);
          }
        });

        target.html(htmlItems);
        $compile(target.contents())($scope);

        $timeout(function () {
          $scope.inited = true;
        });
      }

      function updateItem(item) {
        item.__item_is_show = (!item._treeLinkFrom || $select.search || item._treeLinkFrom && $select.treeIsOpen(item._treeLinkFrom)) && (item.isHidden !== true || $select.hasSubNotHidden(item)) && item.searchHidden !== true;

        item.__search_match = item.searchHidden !== true;
        item.__tree_is_open = $select.treeIsOpen(item._treeLinkTo);
        item.__checkbox_has_sub = $select.hasSubSelected(item);
        item.__checkbox_has_parent = $select.hasParentSelect(item);
      }

      function _updateStatus() {
        if ($scope.inited === true) {
          angular.each($select.selectItems, function (item) {
            updateItem(item);
          });
          $timeout();
        }
      }
    }]
  };
}

/***/ }),

/***/ "Vm7e":
/***/ (function(module, exports) {

module.exports = "<div class=\"custom-multi-select form-control ui-select-container ui-select-multiple select2 select2-container select2-container-multi\"\n  ng-class=\"{\n'hide-search': !$select.searchEnabled,\n'select2-container-active select2-dropdown-open open': $select.open,\n'select2-container-disabled': $select.selectDisabled,\n'custom-tree-select': $select.isTree,\n'custom-static-select': $select.isStatic\n}\">\n  <ma-input placeholder=\"{{ngModel.length ? '' : $select.placeholder}}\"\n    ng-class=\"{\n    'ma-input-arrow-down': !$select.open,\n    'ma-input-arrow-up': $select.open\n  }\"\n    ng-disabled=\"selectDisabled\"></ma-input>\n  <ul class=\"select2-choices\"\n    ma-click=\"$select.showSelect()\"\n    ng-class=\"{\n    'has-selected': ngModel.length\n  }\">\n    <li class=\"ui-select-match-item select2-search-choice ng-scope\"\n      ng-repeat=\"$item in ngModel track by $index\">\n      <span>\n        <span class=\"ng-binding ng-scope\">{{$item.displayText || $item.text}}</span>\n      </span>\n      <ma-icon class=\"ui-select-match-close select2-search-choice-close\"\n        ma-type=\"closecircle\"\n        ma-click=\"$select.removeChoice($item, $event)\"></ma-icon>\n    </li>\n  </ul>\n  <div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active select2-display-none\"\n\n    ng-class=\"{'select2-display-show': $select.open}\">\n    <div class=\"search-container select2-search\"\n      ng-class=\"{'ui-select-search-hidden':!$select.searchEnabled, 'select2-search':$select.searchEnabled}\">\n      <div class=\"ma-input ma-input-search-normal\"\n        ng-disabled=\"selectDisabled\">\n        <input type=\"text\"\n          autocomplete=\"off\"\n          autocorrect=\"off\"\n          autocapitalize=\"off\"\n          spellcheck=\"false\"\n          role=\"combobox\"\n          aria-expanded=\"true\"\n          aria-owns=\"ui-select-choices-0\"\n          aria-label=\"Select box\"\n          class=\"select2-input ui-select-search ng-pristine ng-valid ng-empty ng-touched\"\n          ng-model=\"$select.search\"\n          ng-disabled=\"selectDisabled\"\n          ondrop=\"return false;\">\n      </div>\n    </div>\n    <ul tabindex=\"-1\"\n      class=\"ui-select-choices ui-select-choices-content select2-results ng-scope\"\n      ng-class=\"{'has-scrollbar' : $select.selectItems.length > 5, 'has-search': $select.search}\">\n\n    </ul>\n    <div class=\"ma-dropdown-buttons\"\n      ng-show=\"$select.clear == 'true'\"\n      ma-click=\"$select.clearSelect()\">\n      <ma-button ma-size=\"mini\"\n        ma-type=\"primary\">清空</ma-button>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ "YJOS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("76nD");

var _name2 = _interopRequireDefault(_name);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

var _checkbox = __webpack_require__("qoUc");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _icons = __webpack_require__("/cD4");

var _icons2 = _interopRequireDefault(_icons);

var _input = __webpack_require__("Cs5U");

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], [_button2['default'], _checkbox2['default'], _icons2['default'], _input2['default']]).config(function () {}).run(function () {});

__webpack_require__("VPel");
__webpack_require__("K4Cz");

exports['default'] = _name2['default'];

/***/ }),

/***/ "YkQ5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getCnReg = getCnReg;
exports.getLengthWithEn = getLengthWithEn;
exports.cutStringWithEn = cutStringWithEn;

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _name = __webpack_require__("+VfW");

var _name2 = _interopRequireDefault(_name);

var _v = __webpack_require__("DtRx");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var utils = {
  each: each,
  isNull: isNull,
  isEmpty: isEmpty,
  isArray: isArray,
  uuid: uuid,
  Base64: getBase64(),
  getLengthWithEn: getLengthWithEn,
  cutStringWithEn: cutStringWithEn
};

angular.module(_name2['default']).factory('$utils', function () {
  return utils;
});

Object.assign(angular, utils);

exports['default'] = utils;
function getCnReg() {
  return (/[\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/g
  );
}

function getLengthWithEn(value) {
  var length = value.length;
  var cnLength = (value.match(getCnReg()) || []).length;
  var withEnLength = cnLength + (length - cnLength) * 0.5;
  return withEnLength;
}

function cutStringWithEn(value, length) {
  var count = 0;
  var arr = value.split('');
  var newArr = [];

  arr.forEach(function (item) {
    if (getCnReg().test(item)) {
      count += 1;
    } else {
      count += 0.5;
    }
    if (count <= length) {
      newArr.push(item);
    }
  });
  return newArr.join('');
}

function each(data, callback) {
  if (!data) {
    return;
  }

  if (isObject(data)) {
    if (!isNaN(data.length)) {
      data.forEach(function (v, k, f) {
        callback.call(v, v, k, f);
      });
    } else {
      var items = Object.keys(data);
      each(items, function (v) {
        callback.call(data[v], data[v], v, data);
      });
    }
  }
}

function isNull(value) {
  if (value === '' || value === undefined || value === null) {
    return true;
  }
  return false;
}

function isEmpty(data) {
  if (isNull(data)) {
    return true;
  }
  var count = 0;

  angular.forEach(data, function (d) {
    count++;
  });

  return count <= 0;
}

function isObject(data) {
  return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null;
}

function isArray(data) {
  if (Array.isArray) {
    return Array.isArray(data);
  }
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data && data.length) {
    return true;
  }
  return false;
}

function uuid() {
  // const uuidV1 = require('uuid/v1');
  // uuidV1();
  // const uuidV4 = require('uuid/v4');
  return (0, _v2['default'])();
}

function getBase64() {
  var Base64 = {

    // private property
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    // public method for encoding
    encode: function encode(input) {
      var output = '';
      // eslint-disable-next-line
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        // eslint-disable-next-line
        enc1 = chr1 >> 2;
        // eslint-disable-next-line
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        // eslint-disable-next-line
        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
        // eslint-disable-next-line
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          // eslint-disable-next-line
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }

      return output;
    },

    // public method for decoding
    decode: function decode(input) {
      var output = '';
      // eslint-disable-next-line
      var chr1, chr2, chr3;
      // eslint-disable-next-line
      var enc1, enc2, enc3, enc4;
      var i = 0;

      // eslint-disable-next-line
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        // eslint-disable-next-line
        chr1 = enc1 << 2 | enc2 >> 4;
        // eslint-disable-next-line
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        // eslint-disable-next-line
        chr3 = (enc3 & 3) << 6 | enc4;

        output += String.fromCharCode(chr1);

        if (enc3 != 64) {
          output += String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output += String.fromCharCode(chr3);
        }
      }

      output = Base64._utf8_decode(output);

      return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function _utf8_encode(string) {
      string = string.replace(/\r\n/g, '\n');
      var utftext = '';

      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          // eslint-disable-next-line
          utftext += String.fromCharCode(c >> 6 | 192);
          // eslint-disable-next-line
          utftext += String.fromCharCode(c & 63 | 128);
        } else {
          // eslint-disable-next-line
          utftext += String.fromCharCode(c >> 12 | 224);
          // eslint-disable-next-line
          utftext += String.fromCharCode(c >> 6 & 63 | 128);
          // eslint-disable-next-line
          utftext += String.fromCharCode(c & 63 | 128);
        }
      }

      return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function _utf8_decode(utftext) {
      var string = '';
      var i = 0;
      // eslint-disable-next-line
      var c = c1 = c2 = 0;

      while (i < utftext.length) {
        c = utftext.charCodeAt(i);

        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          // eslint-disable-next-line
          c2 = utftext.charCodeAt(i + 1);
          // eslint-disable-next-line
          string += String.fromCharCode((c & 31) << 6 | c2 & 63);
          i += 2;
        } else {
          // eslint-disable-next-line
          c2 = utftext.charCodeAt(i + 1);
          // eslint-disable-next-line
          c3 = utftext.charCodeAt(i + 2);
          // eslint-disable-next-line
          string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          i += 3;
        }
      }

      return string;
    }

  };
  return Base64;
}

/***/ }),

/***/ "akj6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var util = {
  getNotHiddenValues: function getNotHiddenValues(data) {
    var values = [];

    function getValue(items) {
      angular.forEach(items, function (d) {
        if (!d.isHidden) {
          values.push(d.value);
        }
        if (d.sub && d.sub.length) {
          getValue(d.sub);
        }
      });
    }

    getValue(data);

    return values;
  },
  getDefaultSelectTreeData: function getDefaultSelectTreeData(data, selectedIds) {
    var selected = [];
    var newSelectedIds = [];

    angular.each(selectedIds, function (d) {
      if (angular.isObject(d)) {
        newSelectedIds.push(d.value);
      } else {
        newSelectedIds.push(d);
      }
    });

    function checkSub(items) {
      angular.forEach(items, function (d) {
        if (newSelectedIds.indexOf(d.value) !== -1 && !d.hiddenCheck) {
          selected.push(d);
        }
        if (d.sub && d.sub.length) {
          checkSub(d.sub);
        }
      });
    }
    checkSub(data);

    return selected;
  },
  setParents: function setParents(items) {
    angular.forEach(items, function (item) {
      if (item && item.sub && item.sub.length) {
        _setParents(item.sub, item);
      }
    });

    function _setParents(sub, parent) {
      angular.each(sub, function (dd) {
        dd._parent = parent;
        if (dd.sub && dd.sub.length) {
          _setParents(dd.sub, dd);
        }
      });
    }
  },
  filterSelectTreeData: function filterSelectTreeData(data, selectedIds) {
    angular.forEach(data, function (d) {
      if (selectedIds.indexOf(d.value) !== -1 && d.sub && d.sub.length) {
        setParents(d.sub, d);
        checkSub(d.sub);
      }
    });

    function setParents(sub, parent) {
      angular.each(sub, function (dd) {
        dd._parent = parent;
        if (dd.sub && dd.sub.length) {
          setParents(dd.sub, dd);
        }
      });
    }

    function checkSub(items) {
      var count = 0;
      angular.forEach(items, function (d) {
        if (selectedIds.indexOf(d.value) !== -1) {
          count++;

          if (d.sub && d.sub.length) {
            checkSub(d.sub);
          }
        }
      });

      if (count && count < items.length && selectedIds.indexOf(items[0]._parent.value) !== -1) {
        selectedIds.splice(selectedIds.indexOf(items[0]._parent.value), 1);
        if (items[0]._parent._parent) {
          checkSub(items[0]._parent._parent.sub);
        }
      }
    }

    return selectedIds;
  },
  getSelectTreeData: function getSelectTreeData(config) {
    var data = config.data;
    var text = config.text;
    var displayText = config.displayText;
    var value = config.value;
    var sub = config.sub;

    var tree = [];

    function pushData(items, tree) {
      angular.forEach(items, function (d) {
        tree.push({
          text: d[text],
          value: d[value],
          displayText: d[displayText],
          sub: []
        });
        if (d[sub] && d[sub].length) {
          pushData(d[sub], tree[tree.length - 1].sub);
        }
      });
    }

    pushData(data, tree);

    return tree;
  },
  hiddenSelectTreeDataReverse: function hiddenSelectTreeDataReverse(data) {
    function reverse(items) {
      angular.forEach(items, function (d) {
        d.isHidden = !d.isHidden;

        if (!d.isHidden && d._parent) {
          showParent(d._parent);
        }

        if (d.sub && d.sub.length) {
          reverse(d.sub);
        }
      });
    }

    function showParent(item) {
      item.isHidden = false;
      if (item._parent) {
        showParent(item._parent);
      }
    }

    reverse(data);

    return data;
  },
  hiddenSelectTreeData: function hiddenSelectTreeData(data, hiddenItem, reverse) {
    var hiddenValues = [];
    var hide = true;
    angular.forEach(hiddenItem, function (d) {
      hiddenValues.push(d.value);
    });

    if (reverse) {
      hide = false;
    }

    function hideItemSub(items) {
      angular.forEach(items, function (d) {
        if (!hiddenItem) {
          d.isHidden = hide;
          if (d.sub && d.sub.length) {
            hideItemSub(d.sub);
          }
        } else if (hiddenValues.indexOf(d.value) !== -1) {
          d.isHidden = hide;
          if (d.sub && d.sub.length) {
            hideItemSub(d.sub);
          }
        } else {
          d.isHidden = !hide;

          if (d.sub && d.sub.length) {
            hideItemSub(d.sub);
          }
        }
      });
    }

    function hideItemParent(items) {
      angular.forEach(items, function (d) {
        if (d._parent) {
          hideParent(d._parent);
        }
        if (d.sub && d.sub.length) {
          hideItemParent(d.sub);
        }
      });
    }

    function hideParent(item) {
      var hideCount = 0;
      angular.forEach(item.sub, function (d) {
        if (d.isHidden) {
          hideCount++;
        }
      });
      if (hideCount >= item.sub.length) {
        item.isHidden = true;
        if (item._parent) {
          hideParent(item._parent);
        }
      }
    }

    hideItemSub(data);
    hideItemParent(data);

    return data;
  }
};

exports["default"] = util;

/***/ }),

/***/ "brJl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.icons';

/***/ }),

/***/ "g5ku":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.input';

/***/ }),

/***/ "g66R":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.button';

/***/ }),

/***/ "gU1X":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = __webpack_require__("YkQ5");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module('validation.rule', []).config(['$validationProvider', function ($validationProvider) {
  var expression = {
    'null': function _null() {
      return true;
    },
    required: function required(value) {
      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.length === 0) {
        return false;
      }
      if (value === 0) {
        return true;
      }
      return !!value;
    },
    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    email: /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    number: /^\d+$/,
    minlength: function minlength(value, scope, element, attrs, param) {
      return value.length >= param;
    },
    maxlength: function maxlength(value, scope, element, attrs, param) {
      return value.length <= param;
    },
    minlengthwithen: function minlengthwithen(value, scope, element, attrs, param) {
      return (0, _utils.getLengthWithEn)(value) >= param;
    },
    maxlengthwithen: function maxlengthwithen(value, scope, element, attrs, param) {
      return (0, _utils.getLengthWithEn)(value) <= param;
    },
    cellphone: function cellphone(value, scope, element, attrs, param) {
      value += '';
      if (!value) {
        return false;
      }
      if (isNaN(value)) {
        return false;
      }
      if (value.length !== 11) {
        return false;
      }

      return true;
    },
    phone: function phone(value, scope, element, attrs, param) {
      value += '';
      if (!value) {
        return false;
      }
      if (isNaN(value) && !/-/g.test(value)) {
        return false;
      }
      // 固话 位数
      // 3 + 7
      // 3 + 8
      // 4 + 7
      // 4 + 8
      // 手机 位数
      // 11
      if (value.length !== 10 && value.length !== 11 && value.length !== 12) {
        return false;
      }

      return true;
    },
    zipcode: function zipcode(value, scope, element, attrs, param) {
      return (/^[1-9]\d{5}$/g.test(value)
      );
    },
    bankcard: function bankcard(value, scope, element, attrs, param) {
      return (/^([1-9]{1})(\d{11}|\d{14}|\d{15}|\d{17}|\d{18}|\d{19})$/g.test(value)
      );
    },
    // 比例
    ratio: function ratio(value, scope, element, attrs, param) {
      return !value || value >= 0 && /^[1-9]\d*$/.test(String(value));
    },
    // 计数
    count: function count(value, scope, element, attrs, param) {
      return !value || String(value) === '0' || /^[1-9]\d*$/.test(String(value));
    },
    // 金额
    currency: function currency(value, scope, element, attrs, param) {
      return !value || String(value) === '0' || /^[0-9]+(.[0-9]{1,2})?$/.test(String(value));
    },
    // 百分比
    percentage: function percentage(value, scope, element, attrs, param) {
      return !value || String(value) === '0' || /^[0-9]+(.[0-9]{1,2})?$/.test(String(value));
    },
    // 自定义验证，param 是正则表达式
    custom: function custom(value, scope, element, attrs, param) {
      var regExp = new RegExp(param);
      return !value || regExp.test(String(value));
    },
    password: function password(value) {
      if (value) {
        var pwdReg = /^[a-zA-Z0-9_!@#$%^&*]{6,16}$/;
        var num = /^[0-9]{1,9}$/;
        return pwdReg.test(value) && !num.test(value);
      }
      return false;
    },
    same: function same(value, scope, element, attrs, param) {
      return value == scope.$eval(param);
    }
  };

  var errorMsgTemplate = function errorMsgTemplate(element, attrs, param, msg) {
    if (attrs.invalidMessage) {
      return attrs.invalidMessage;
    }
    return msg;
  };

  var defaultMsg = {
    'null': {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, 'OK');
      },
      success: 'OK'
    },
    cellphone: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的手机号码');
      },
      success: 'OK'
    },
    phone: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的电话号码');
      },
      success: 'OK'
    },
    required: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '不能为空');
      },
      success: 'OK'
    },
    url: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入URL链接');
      },
      success: 'OK'
    },
    email: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的邮箱地址');
      },
      success: 'OK'
    },
    number: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入数字');
      },
      success: 'OK'
    },
    minlength: {
      error: function error(element, attrs, param) {
        var len = parseInt(param, 10);
        return errorMsgTemplate(element, attrs, param, '\u6700\u77ED\u4E3A' + len + '\u4E2A\u5B57\u7B26');
      },
      success: 'OK'
    },
    maxlength: {
      error: function error(element, attrs, param) {
        var len = parseInt(param, 10);
        return errorMsgTemplate(element, attrs, param, '\u6700\u957F\u4E3A' + len + '\u4E2A\u5B57\u7B26');
      },
      success: 'OK'
    },
    minlengthwithen: {
      error: function error(element, attrs, param) {
        var len = parseInt(param, 10);
        return errorMsgTemplate(element, attrs, param, '\u6700\u77ED\u4E3A' + len + '\u4E2A\u5B57\u7B26');
      },
      success: 'OK'
    },
    maxlengthwithen: {
      error: function error(element, attrs, param) {
        var len = parseInt(param, 10);
        return errorMsgTemplate(element, attrs, param, '\u6700\u957F\u4E3A' + len + '\u4E2A\u5B57\u7B26');
      },
      success: 'OK'
    },
    zipcode: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的邮编');
      },
      success: 'OK'
    },
    bankcard: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入正确的银行卡号');
      },
      success: 'OK'
    },
    ratio: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入有效的比例数值');
      },
      success: 'OK'
    },
    count: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入有效的计数数值');
      },
      success: 'OK'
    },
    currency: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入有效的金额数值');
      },
      success: 'OK'
    },
    percentage: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '请输入有效的百分比数值');
      },
      success: 'OK'
    },
    custom: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '验证未通过');
      },
      success: 'OK'
    },
    password: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '长度为6-16个字符，不能包含空格，不能是9位以下纯数字');
      },
      success: 'OK'
    },
    same: {
      error: function error(element, attrs, param) {
        return errorMsgTemplate(element, attrs, param, '内容不一致');
      },
      success: 'OK'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

  $validationProvider.showSuccessMessage = true; // or true(default)
  $validationProvider.showErrorMessage = true; // or true(default)

  $validationProvider.setErrorHTML(function (msg) {
    return '<b class="form-error-text">' + msg + '</b>';
  });
  $validationProvider.setSuccessHTML(function (msg) {
    return '<i></i>';
  });

  _jquery2['default'].extend(true, $validationProvider, {
    validCallback: function validCallback(element) {
      // console.log(element, 'validCallback');
      element.addClass('ma-input-success').removeClass('ma-input-error').removeClass('ma-input-warning');
    },
    invalidCallback: function invalidCallback(element) {
      // console.log(element, 'invalidCallback');
      element.removeClass('ma-input-success').addClass('ma-input-error').removeClass('ma-input-warning');
    },
    resetCallback: function resetCallback(element) {
      // console.log(element, 'resetCallback');
      element.removeClass('ma-input-success').removeClass('ma-input-error').removeClass('ma-input-warning');
    },
    validingCallback: function validingCallback(element) {
      // console.log(element, 'resetCallback');
      element.addClass('ma-input-warning').removeClass('ma-input-success').removeClass('ma-input-error');
    }
  });
}]);

/***/ }),

/***/ "lkey":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("g66R");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("S1RN");

exports['default'] = _name2['default'];

/***/ }),

/***/ "qSUM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("brJl");

var _name2 = _interopRequireDefault(_name);

var _maCircleTpl = __webpack_require__("UX8a");

var _maCircleTpl2 = _interopRequireDefault(_maCircleTpl);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maIcon', maIcon);
// .directive('maCircle', maCircle);

maIcon.$inject = [];

function maIcon() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      type: '@maType',
      size: '@maSize'
    },
    template: '\n    <i\n      class="iconfont icon-{{type}}"\n      ng-style="{fontSize: size + \'px\'}"\n      ng-transclude\n    ></i>',
    link: function link(scope, element, attrs, controllers) {}
  };
}

// maCircle.$inject = [];

// function maCircle() {
//   return {
//     restrict: 'E',
//     replace: true,
//     scope: {
//       size: '@maSize',
//       strokeWidth: '@maStrokeWidth',
//       percent: '@maPercent',
//       backStroke: '@maBackStroke',
//       frontStroke: '@maFrontStoke',
//     },
//     template: maCircleTpl,
//     link: function (scope, element, attrs, controllers) {
//       scope.pi = Math.PI;
//       scope.size = 12;
//       scope.strokeWidth = 1;
//       scope.percent = 0;
//       scope.backStroke = '#FFFFFF';
//       scope.frontStroke = '#FF74B9';
//       updateCircle();

//       attrs.$observe('maSize', d => {
//         scope.size = d ? parseInt(d, 10) : 12;
//         updateCircle();
//       });
//       attrs.$observe('maStrokeWidth', d => {
//         scope.strokeWidth = d ? parseInt(d, 10) : 1;
//         updateCircle();
//       });
//       attrs.$observe('maPercent', d => {
//         scope.percent = d ? parseInt(d, 10) / 100 : 0;
//         updateCircle();
//       });
//       attrs.$observe('maBackStroke', d => {
//         scope.backStroke = d || '#FFFFFF';
//         updateCircle();
//       });
//       attrs.$observe('maFrontStoke', d => {
//         scope.frontStroke = d || '#FF74B9';
//         updateCircle();
//       });

//       function updateCircle() {
//         const circles = $(element).find('circle');
//         const back = circles.eq(0);
//         const front = circles.eq(1);

//         element.attr('width', scope.size);
//         element.attr('height', scope.size);

//         back.attr('cx', scope.size / 2);
//         back.attr('cy', scope.size / 2);
//         back.attr('r', (scope.size / 2) - scope.strokeWidth);
//         back.attr('stroke-width', (scope.size / 2) - scope.strokeWidth);
//         back.attr('stroke', scope.backStroke);

//         front.attr('cx', scope.size / 2);
//         front.attr('cy', scope.size / 2);
//         front.attr('r', (scope.size / 2) - scope.strokeWidth);
//         front.attr('stroke-width', scope.strokeWidth);
//         front.attr('stroke', scope.frontStroke);
//         front.attr('transform', `matrix(0,-1,1,0,0,${scope.size})`);
//         front.attr('stroke-dasharray',
//           `${2 * Math.PI * ((scope.size / 2) - scope.strokeWidth) * scope.percent} ${2 * Math.PI * ((scope.size / 2) - scope.strokeWidth)}`
//         );
//       }
//     }
//   };
// }

/***/ }),

/***/ "qoUc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("HuZX");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("FR6Y");

exports['default'] = _name2['default'];

/***/ })

},["YJOS"]);
//# sourceMappingURL=treeSelect.js.map