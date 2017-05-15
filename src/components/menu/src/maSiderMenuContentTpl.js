export default `<div class="sider-menu-content">
  <div class="sider-menu-item" ng-repeat="router in routers">
    <a
    href="javascript:void(0);"
    ng-class="{active: $state.href($state.current.name, $state.params) === $state.href(router.state, router.params), arrow: router.routers && router.routers.length}"
    ma-click="itemClick(router, $event)">
      <span>{{router.title}}</span>
      <ma-icon type="{{router.expand ? 'up' : 'down'}}" ng-if="router.routers && router.routers.length"></ma-icon>
    </a>
    <ma-sider-menu-content ng-class="{hide: !router.expand}" ng-if="router.routers && router.routers.length" ma-routers="router.routers"></ma-sider-menu-content>
  </div>
</div>`;