import moduleName from './name.js';
import $ from 'jquery';
import maTooltipTpl from './maTooltipTpl.html';

angular.module(moduleName)
  .directive('maTooltip', maTooltip);

maTooltip.$inject = ['$timeout', '$compile'];

function maTooltip($timeout, $compile) {
  return {
    restrict: 'A',
    scope: {
      contentScope: '=maScope',
    },
    link: function(scope, element, attrs, ctrl) {
      const el = $(maTooltipTpl);
      const content = el.find('.ma-tooltip-content');
      const defaultDirection = 'tc';

      let isPopconfirm = false;
      let direction = defaultDirection;
      let prevDirection = '';

      $('body').append(el);

      $(element).hover(d => {
        if (isPopconfirm) {
          return;
        }
        showTip();
      }, () => {
        if (isPopconfirm) {
          return;
        }
        hideTip();
      }).on('mousemove', mousemove);

      el.hover(d => {
        if (isPopconfirm) {
          return;
        }
        showTip();
      }, () => {
        if (isPopconfirm) {
          return;
        }
        hideTip();
      }).on('mousemove', mousemove);

      $('body').on('mousemove', hideTip);

      attrs.$observe('maTooltip', d => {
        content.html(d);
        $compile(content.contents())(scope.contentScope || scope);
      });
      attrs.$observe('maPopconfirm', d => {
        if (d == 'true') {
          isPopconfirm = true;
          el.addClass('ma-popconfirm-tooltip');
          element.on('click', () => {
            showTip();
          });
        }
      });
      scope.$on('$destroy', d => {
        el.remove();
        $('body').off('mousemove', hideTip);
      });
      attrs.$observe('maDirection', d => {
        direction = d || defaultDirection;
        el.attr('data-direction', d || defaultDirection);
        content.attr('data-direction', d || defaultDirection);
        $timeout(() => {
          el.width(el.width());
          el.height(el.height());
        });
      });

      function showTip(newDirection) {
        const offsetTop = $(element).offset().top;
        const offsetLeft = $(element).offset().left;
        const elHeight = el.outerHeight();
        const elWidth = el.outerWidth();
        const elementHeight = $(element).outerHeight();
        const elementWidth = $(element).outerWidth();

        const boxPadding = 10;

        let top = 0;
        let left = 0;
        let hasNew = false;

        if (prevDirection) {
          direction = prevDirection;
          el.attr('data-direction', direction);
          content.attr('data-direction', direction);
        }

        if (newDirection && typeof newDirection === 'string') {
          prevDirection = direction;
          direction = newDirection;
          hasNew = true;
          el.attr('data-direction', direction);
          content.attr('data-direction', direction);
        }

        switch (direction) {
          case 'tc':
            top = offsetTop - elHeight;
            left = offsetLeft + ((elementWidth - elWidth) / 2);
            break;
          case 'tl':
            top = offsetTop - elHeight;
            left = offsetLeft - boxPadding;
            break;
          case 'tr':
            top = offsetTop - elHeight;
            left = (offsetLeft + boxPadding) - (elWidth - elementWidth);
            break;
          case 'lc':
            top = offsetTop - ((elHeight - elementHeight) / 2);
            left = offsetLeft - elWidth;
            break;
          case 'lt':
            top = offsetTop - boxPadding;
            left = offsetLeft - elWidth;
            break;
          case 'lb':
            top = (offsetTop + boxPadding) - (elHeight - elementHeight);
            left = offsetLeft - elWidth;
            break;
          case 'rc':
            top = offsetTop - ((elHeight - elementHeight) / 2);
            left = offsetLeft + elementWidth;
            break;
          case 'rt':
            top = offsetTop - boxPadding;
            left = offsetLeft + elementWidth;
            break;
          case 'rb':
            top = (offsetTop + boxPadding) - (elHeight - elementHeight);
            left = offsetLeft + elementWidth;
            break;
          case 'bc':
            top = offsetTop + elementHeight;
            left = offsetLeft + ((elementWidth - elWidth) / 2);
            break;
          case 'bl':
            top = offsetTop + elementHeight;
            left = offsetLeft - boxPadding;
            break;
          case 'br':
            top = offsetTop + elementHeight;
            left = (offsetLeft + boxPadding) - (elWidth - elementWidth);
            break;
        }

        el.css({
          top,
          left,
        });

        $timeout(function() {
          if (!hasNew) {
            checkPositon();
          }
          el.addClass('show');
        }, 10);
      }

      function checkPositon() {
        const offsetTop = el.offset().top - $(window).scrollTop();
        const offsetLeft = el.offset().left - $(window).scrollLeft();
        const wh = $(window).height();
        const ww = $(window).width();
        const elHeight = el.outerHeight();
        const elWidth = el.outerWidth();
        const elementHeight = $(element).outerHeight();
        const elementWidth = $(element).outerWidth();

        // console.log(offsetTop, offsetLeft);

        let newDirectionFirst = direction.split('')[0];
        let newDirectionSecond = direction.split('')[1];
        let newDirectionFirstReseted = false;
        let newDirection = '';

        if (offsetTop < 0) {
          newDirectionFirst = 'b';
        } else if (offsetTop + elHeight > wh) {
          newDirectionFirst = 't';
        } else if (offsetLeft < 0) {
          newDirectionFirst = 'r';
        } else if (offsetLeft + elWidth > ww) {
          newDirectionFirst = 'l';
        }

        if (newDirectionFirst == 't' || newDirectionFirst == 'b') {
          if (offsetLeft < 0) {
            newDirectionSecond = 'l';
          } else if (offsetLeft + elWidth > ww) {
            newDirectionSecond = 'r';
          } else if (newDirectionSecond === 't' || newDirectionSecond === 'b') {
            newDirectionSecond = 'c';
          }
        }

        if (newDirectionFirst == 'l' || newDirectionFirst == 'r') {
          if (offsetTop < 0) {
            newDirectionSecond = 't';
          } else if (offsetTop + elHeight > wh) {
            newDirectionSecond = 'b';
          } else if (newDirectionSecond === 'l' || newDirectionSecond === 'r') {
            newDirectionSecond = 'c';
          }
        }

        newDirection = newDirectionFirst + newDirectionSecond;

        if (newDirection !== direction) {
          prevDirection = '';
          showTip(newDirection);
        }
      }

      function hideTip() {
        el.removeClass('show');
      }

      function mousemove(e) {
        e.stopPropagation();
      }
    }
  };
}