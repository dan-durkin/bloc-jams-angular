(function(){
	function PlayerBarCtrl (Fixtures, SongPlayer, $scope) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = playerBarSongPlayer = SongPlayer;
		
		playerBarSongPlayer.register($scope);
	}
	
	angular
		.module('blocJams')
		.controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', '$scope', PlayerBarCtrl]);
})();