(function(){
	function PlayerBarCtrl (Fixtures, SongPlayer, $scope) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
		
		$scope.$watch("songPlayer.currentTime", function () {
			debugger;
		});
	}
	
	angular
		.module('blocJams')
		.controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', '$scope', PlayerBarCtrl]);
})();