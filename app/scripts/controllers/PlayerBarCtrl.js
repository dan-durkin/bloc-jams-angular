(function(){
	function PlayerBarCtrl (Fixtures, SongPlayer, $scope) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
		
		SongPlayer.register($scope);
	}
	
	angular
		.module('blocJams')
		.controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', '$scope', PlayerBarCtrl]);
})();