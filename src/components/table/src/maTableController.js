import $ from 'jquery';

maTableController.$inject = ['NgTableParams', '$scope', '$element', '$interpolate', '$sce', '$table', '$timeout', '$attrs'];

function maTableController(NgTableParams, $scope, $element, $interpolate, $sce, $table, $timeout, $attrs) {
  var self = this;

  // var dataset = [{ id: 1, name: 'christian', age: 21 }, { id: 2, name: 'anthony', age: 88 },
  //   { id: 3, name: 'christian', age: 21 }, { id: 4, name: 'anthony', age: 88 },
  //   { id: 5, name: 'christian', age: 21 }, { id: 6, name: 'anthony', age: 88 },
  //   { id: 7, name: 'christian', age: 21 }, { id: 8, name: 'anthony', age: 88 },
  //   { id: 3, name: 'christian', age: 21 }, { id: 4, name: 'anthony', age: 88 },
  //   { id: 5, name: 'christian', age: 21 }, { id: 6, name: 'anthony', age: 88 },
  //   { id: 7, name: 'christian', age: 21 }, { id: 8, name: 'anthony', age: 88 },
  //   { id: 3, name: 'christian', age: 21 }, { id: 4, name: 'anthony', age: 88 },
  //   { id: 5, name: 'christian', age: 21 }, { id: 6, name: 'anthony', age: 88 }];
  if (angular.isNull($scope.tableConfig)) {
    return;
  }
  self.cols = $scope.tableConfig.cols ? $scope.tableConfig.cols : [];
  self.getClass = function(row) {
    return (self.checkboxes.items[row[self.dataflagId]] ? 'selected-row' : '') + ' ' + ($scope.tableConfig.rowCustomClass ? $scope.tableConfig.rowCustomClass : '');
  };
  self.evtAgent = $scope.tableConfig.evtAgent ? $scope.tableConfig.evtAgent : [];
  self.dataflagId = $scope.tableConfig.dataflagId ? $scope.tableConfig.dataflagId : 'id';
  self.count = $scope.tableConfig.count ? $scope.tableConfig.count : 10;
  self.sorting = $scope.tableConfig.sorting ? $scope.tableConfig.sorting : {};
  self.PageSize = $scope.tableConfig.counts ? $scope.tableConfig.counts : [10, 20, 30];
  self.enableCheckbox = angular.isNull($scope.tableConfig.enablePagination) ? false : $scope.tableConfig.enableCheckbox;
  self.enablePagination = angular.isNull($scope.tableConfig.enablePagination) ? true : $scope.tableConfig.enablePagination;
  self.dataset = $scope.tableConfig.dataset ? $scope.tableConfig.dataset : [];
  self.colsGroup = $scope.tableConfig.colsGroup ? $scope.tableConfig.colsGroup : [];

  self.page = $scope.tableConfig.page || 1;

  self.tableWidth = $scope.tableConfig.tableWidth || 0;

  self.isColsGroupFromCols = false;

  // 如果没配置 colsGroup，就去 cols 里面取
  if (!self.colsGroup.length) {
    self.isColsGroupFromCols = true;
    getColsGroupFromCols(self.cols);
  }

  if (self.isColsGroupFromCols) {
    $scope.$watch('tableConfig.cols', d => {
      getColsGroupFromCols(d);
    });
  }

  function getColsGroupFromCols(cols) {
    let colsGroup = [];
    angular.forEach(cols, d => {
      if (d.show !== false && !d.headerTemplateURL) {
        colsGroup.push({
          width: d.width || '100px'
        });
      }
    });
    self.colsGroup = colsGroup;
    $scope.tableConfig.colsGroup = self.colsGroup;
  }

  $scope.$watch('tableConfig.colsGroup', d => {
    self.colsGroup = d || [];
    if (self.enableCheckbox && self.colsGroup.length) {
      self.colsGroup.unshift({
        width: '0%'
      });
    }
  });


  // self.PageSize = self.counts;

  // 转换pageSize
  self._PageSize = [];
  angular.forEach(self.PageSize, function(d, k) {
    self._PageSize[k] = {
      text: d + ' 条 / 页',
      value: d
    };
  });


  self.tableId = $scope.tableConfig.tableId || (+new Date());

  // 左右漂浮列
  self.floatLeftCols = [];
  self.floatRightCols = [];

  angular.forEach(self.cols, (v, k) => {
    if (v.fLeft) {
      self.floatLeftCols.push(v);
    }
    if (v.fRight) {
      self.floatRightCols.push(v);
    }
  });

  // 如果不存在左右漂浮
  // if (!self.floatLeftCols.length) {
  //   $($element).find('.float-left-table').addClass('none');
  // }
  // if (!self.floatRightCols.length) {
  //   $($element).find('.float-right-table').addClass('none');
  // }

  // 如果要checkbox
  if (self.enableCheckbox) {
    self.cols.unshift({
      field: 'selector',
      title: '',
      headerTemplateURL: 'headerCheckbox.html',
      show: true
    });

    if (self.floatLeftCols.length) {
      self.floatLeftCols.push(self.cols[0]);
    }
  }

  if (!self.enablePagination) {
    // 当不需要分页时提供一个无限大的值
    self.count = 10000000000000;
  } else {
    var changePage = function(nextPage) {
      if (!nextPage) {
        return;
      }
      self.tableParams.page(nextPage);
    };
    var isFirstChangePageSize = true;
    var changePageSize = function(newSize) {
      self.tableParams.count(newSize, !isFirstChangePageSize);
      isFirstChangePageSize = false;
    };
    self.changePage = changePage;
    self.changePageSize = changePageSize;

    $scope.$watch(function() {
      return self.newPageSize;
    }, function(d) {
      if (d) {
        changePageSize(d.value);
      }
    });

    $scope.$watch(function() {
      return self.tableParams.count();
    }, function(d) {
      angular.forEach(self._PageSize, data => {
        if (d === data.value) {
          self.newPageSize = data;
        }
      });
    });

    $scope.$watch(function() {
      return self.tableParams.page();
    }, function(d) {
      self.nextPageNum = d;
    });
  }
  self.nextPageNum = 1;
  self.tableParams = new NgTableParams({
    count: self.count,
    sorting: self.sorting,
    page: self.page,
    templateHeader: 'header1.html'
  }, {
    counts: [],
    templateHeader: 'header1.html',
    paginationMaxBlocks: 4,
    paginationMinBlocks: 1,
    getData: $scope.tableConfig && $scope.tableConfig.getData ? function(NgTableParams) {
      if (self.isLoading) {
        let newData = [];
        angular.forEach(NgTableParams.data, (d, k) => {
          newData.push($.extend(true, {}, d));
          delete newData[k].$$hashKey;
        });
        return NgTableParams.data;
      }

      self.isLoading = true;
      var deferred = $scope.tableConfig.getData.apply(this, arguments);

      if (deferred && deferred.then) {
        deferred.then(function() {
          self.isLoading = false;
          setFloatTable();
        }, function() {
          self.isLoading = false;
          setFloatTable();
        });
      } else {
        self.isLoading = false;
      }

      return deferred;
    } : function() {
      return [];
      // return [];
    },
    dataset: self.dataset
  });
  self.checkboxes = {
    checked: false,
    items: {}
  };
  // self.test = 'test';
  // watch for check all checkbox
  $scope.$watch('$tableCtrl.checkboxes.checked', function(value, test, test1) {
    angular.forEach(self.tableParams.data, function(item) {
      self.checkboxes.items[item[self.dataflagId]] = value;
    });
  });
  // angular.element($element[0]).find('table').html('<div>test</div>');
  // .prop('indeterminate', (checked != 0 && unchecked != 0));
  // // watch for data checkboxes
  $scope.$watch(function() {
    return self.checkboxes.items;
  }, function(values) {
    var checked = 0;
    var unchecked = 0;
    var total = self.tableParams.data.length;
    angular.forEach(self.tableParams.data, function(item) {
      checked += (self.checkboxes.items[item[self.dataflagId]]) || 0;
      unchecked += (!self.checkboxes.items[item[self.dataflagId]]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)) {
      self.checkboxes.checked = (checked == total) && (total != 0);
    }
    // grayed checkbox
    angular.element($($element).find('.main-table').get(0).getElementsByClassName('select-all')).prop('indeterminate', (checked != 0 && unchecked != 0));
  }, true);


  // 获取选中行数据
  self.tableParams.getSelected = function() {
    var selected = [];
    angular.forEach(self.tableParams.data, function(item, key) {
      if (self.checkboxes.items[item[self.dataflagId]]) {
        selected.push(item);
      }
    });
    return selected;
  };

  // 设置选中 ids 可以对应数据的Id string 或者array, 如果为布尔值则为全选和全不选
  // select 默认为true 如果要设置指定 不选中就为false
  self.tableParams.setSelect = function(ids, select) {
    if (angular.isNull(ids)) {
      console.error('请传需要选中的参数');
      return;
    }

    if (angular.isNull(select)) {
      select = true;
    } else {
      select = !!select;
    }

    if (typeof ids === 'boolean') {
      // self.checkboxes.checked = ids;
      angular.forEach(self.tableParams.data, function(item) {
        self.checkboxes.items[item[self.dataflagId]] = ids;
      });
      return;
    }

    if (typeof ids === 'string' || typeof ids === 'number') {
      ids = [ids];
    }

    var selectedCount = 0;
    angular.forEach(self.tableParams.data, function(item) {
      if (ids.indexOf(item[self.dataflagId]) !== -1) {
        self.checkboxes.items[item[self.dataflagId]] = select;
        selectedCount++;
      }
    });

    // if (select && self.tableParams.data && selectedCount >= self.tableParams.data.length) {
    //   self.checkboxes.checked = true;
    // } else {
    //   self.checkboxes.checked = false;
    // }
  };

  self.tableParams.setUnSelect = function(ids) {
    self.tableParams.setSelect(ids, false);
  };

  self.tableParams.selectAll = function() {
    self.tableParams.setSelect(true);
  };
  self.tableParams.unSelectAll = function() {
    self.tableParams.setSelect(false);
  };


  $scope.tableConfig.tableIns = self.tableParams;
  self.tableParams.tableId = self.tableId;

  $table.addTable(self.tableId, self.tableParams);


  $scope.$on('$destroy', function() {
    $table.removeTable(self.tableId, self.tableParams);
    $(window).unbind('resize', setFloatTable);
  });


  // 计算漂浮 table 的宽度
  $(window).bind('resize', setFloatTable);

  $timeout(() => {
    setFloatTable();
  }, 50);
  $timeout(() => {
    setFloatTable();
  }, 100);

  function setFloatTable() {
    $timeout(() => {
      let floatLeftBoxWidth = 0;
      let floatRightBoxWidth = 0;
      self.floatTableWidth = $($element).find('.main-table').outerWidth();
      self.floatTableHeight = $($element).find('.main-table').outerHeight();
      self.mainContainerWidth = $($element).find('.main-table-container').width();

      for (var i = 0; i < self.floatLeftCols.length; i++) {
        floatLeftBoxWidth += $($element).find('.main-table tr th').eq(i).outerWidth();
      }
      for (var j = self.cols.length - 1; j >= self.cols.length - self.floatRightCols.length; j--) {
        floatRightBoxWidth += $($element).find('.main-table tr th').eq(j).outerWidth();
      }


      self.floatLeftBoxWidth = floatLeftBoxWidth;
      self.floatRightBoxWidth = floatRightBoxWidth;
    });
  }
}

// angular.module('ui.component.custom.table').run(configureDefaults);
// configureDefaults.$inject = ['ngTableDefaults'];

// function configureDefaults(ngTableDefaults) {
//   ngTableDefaults.params.count = 5;
//   ngTableDefaults.settings.counts = [];
// }


export default maTableController;