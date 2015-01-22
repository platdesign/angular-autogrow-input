'use strict';



var ngModule;

try {
	ngModule = angular.module('pd');
} catch(err) {
	ngModule = angular.module('pd', []);
}

module.exports = ngModule;


ngModule.directive('pdAutogrowInput', function() {

	return {
		restrict: 'A',
		scope: { model: '=ngModel' },
		link: function postLink(scope, element, attrs) {
			var wrapper = angular.element('<div style="position:fixed; top:-999px; left:0;"></div>').appendTo(angular.element('body'));
			var mirror = angular.element('<span style="white-space:pre;"></span>').appendTo(wrapper);


			var defaultMaxWidth = (element.css('maxWidth') === 'none') ? element.parent().innerWidth() : element.css('maxWidth');

			element.css('minWidth', attrs.puElasticInputMinwidth || element.css('minWidth'));
			element.css('maxWidth', attrs.puElasticInputMaxwidth || defaultMaxWidth);

			function update() {
				angular.forEach([
					'fontFamily',
					'fontSize',
					'fontWeight',
					'fontStyle',
					'letterSpacing',
					'textTransform',
					'wordSpacing',
					'textIndent',
					'boxSizing',
					'borderRightWidth',
					'borderLeftWidth',
					'borderLeftStyle',
					'borderRightStyle',
					'paddingLeft',
					'paddingRight',
					'marginLeft',
					'marginRight'
				], function (value) {
					mirror.css(value, element.css(value));
				});

				mirror.text(element.val() || attrs.placeholder);
				element.css('width', mirror.outerWidth() + 1);
			}


			if (attrs.ngModel) {
				scope.$watch('model', function () {
					update();
				});
			} else {
				element.on('keydown keyup focus input propertychange change', function () {
					update();
				});
			}

			scope.$on('pdAutogrowInputUpdate', function() {
				setTimeout(function() {
					update();
				});
			});

			// Initial update
			update();
	  }
	};

});
