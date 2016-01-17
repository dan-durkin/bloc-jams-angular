(function (){
	function ProfileCtrl(){
		this.name = "Dan";
	}
	
	angular
		.module('blocJams')
		.controller('ProfileCtrl', ProfileCtrl);
})();