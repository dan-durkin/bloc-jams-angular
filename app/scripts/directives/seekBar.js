(function (){
	function seekBar($document){
		var calculatePercent = function (seekBar, event) {
			var offsetX = event.pageX - seekBar.offset().left;
			var seekBarWidth = seekBar.width();
			var offsetXPercent = offsetX/seekBarWidth;
			offsetXPercent = Math.min(offsetXPercent, 1);
			offsetXPercent = Math.max(offsetXPercent, 0);
			return offsetXPercent;
		};
		
		return {
			templateUrl: '/templates/directives/seek_bar.html',
			replace: true,
			restrict: 'E',
			scope: {
				onChange: '&'
			},
			link: function (scope, element, attributes) {
				scope.value = 0;
				scope.max = 100;
				
				attributes.$observe('value', function(newValue){
					scope.value = newValue;
				});
				
				attributes.$observe('max', function(newValue){
					scope.max = newValue;
				});
	
				var seekBar = $(element);
				
				var percentString = function (){
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + '%';
				};
				
				var notifyOnChange = function(newValue){
					if(typeof scope.onChange === 'function'){
						scope.onChange({value:newValue});
					}	
				};
				
				scope.onClickSeekBar = function (event){
					var percent = calculatePercent(seekBar, event)
					scope.value = percent * scope.max;
					notifyOnChange(scope.value);
				};
				
				scope.fillStyle = function (){
					return {width: percentString()};
				};

				scope.thumbStyle = function(){
					return {left: percentString()};
				};
				
				scope.trackThumb = function(){
					$document.bind('mousemove.thumb', function () {
						var percent = calculatePercent(seekBar, event);
						scope.$apply(function(){
							scope.value = percent * scope.max;
							notifyOnChange(scope.value);
						});
					});
					
					$document.bind('mouseup.thumb', function(){
						$document.unbind('mousemove.thumb');
						$document.unbind('mouseup.thumb');
					});
				};
			}
		}
	}
	
	angular
		.module('blocJams')
		.directive('seekBar', ['$document', seekBar]);
})();