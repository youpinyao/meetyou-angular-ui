export default `<div class="crumb">
  <span class="crumb-item" ng-repeat="item in crumbItems" ng-if="!$last">
    <span>
      <a href="javascript:void(0)" ng-click="$state.go(item.state, item.params)">{{item.title}}</a>
    </span>
    <span>{{separator}}</span>
  </span>
  <span class="crumb-item" ng-repeat="item in crumbItems" ng-if="$last && showCurrent === true">
    <span>{{item.title}}</span>
    <span>{{separator}}</span>
  </span>
  <span class="crumb-item">
    <span ng-transclude></span>
    <span>{{separator}}</span>
  </span>
</div>`;
