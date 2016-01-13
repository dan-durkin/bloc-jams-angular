(function(){
	function SongPlayer(Fixtures) {
		/**
		* @desc SongPlayer service; play, pause audio files
		* @type {Object} SongPlayer
		**/
		var SongPlayer = {};
		/**
		* @desc Current Album
		* @type {Object} Album
		**/
		var currentAlbum = Fixtures.getAlbum();
		/**
		* @desc Currently playing audio file as Buzz object
		* @type {Object} Buzz object
		**/
		var currentBuzzObject = null;
		
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song){
			if(currentBuzzObject){
				stopSong(SongPlayer.currentSong);
			}
			
			currentBuzzObject = new buzz.sound(song.audioURL,{
				formats: ['mp3'],
				preload: true
			});
			
			SongPlayer.currentSong = song;
		};
		
		/**
		* @function playSong
		* @desc Used in conjuction with setSong; plays audio file as currentBuzzObject and set playing propert to true
		* @param {Object} song
		*/
		var playSong = function(song){
			currentBuzzObject.play();
			song.playing = true;
		};
		
		/**
		* @function stopSong
		* @desc Used in conjuction with setSong; stops audio file as currentBuzzObject and set playing propert to null
		* @param {Object} song
		*/
		var stopSong = function(song){
			currentBuzzObject.stop();
			song.playing = null;
			currentBuzzObject = null;
			SongPlayer.currentSong = null;
		};
		
		/**
		* @function getSongIndex
		* @desc Returns index of currentSong within the songs array
		* @param {Object} song
		* @return number
		*/
		var getSongIndex = function (song){
			return currentAlbum.songs.indexOf(song);
		}
		
		/**
		* @desc Active song object from list of songs
		* @type {Object} song
		**/
		SongPlayer.currentSong = null;
		
		/**
		* @function play
		* @desc  Plays audio file and adjust playing property to true.
		* @param {Object} song
		*/
		SongPlayer.play = function(song){
			song = song || SongPlayer.currentSong;
			if(SongPlayer.currentSong !== song){
				setSong(song);
				playSong(song);
				SongPlayer.currentSong = song;
			}
			else if(SongPlayer.currentSong === song && currentBuzzObject.isPaused()){
				playSong(song);
			}
		};
		
		/**
		* @function pause
		* @desc  Pauses audio files and adjusts playing property to false.
		* @param {Object} song
		*/
		SongPlayer.pause = function(song){
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		/** @function previous
		* @desc Find the index of the currently playing song, decrements the index by 1, and plays the song in the songs array at the new index.
		* @param {Object} song
		*/
		SongPlayer.previous = function(){
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--
			
			if(currentSongIndex < 0){
				stopSong(SongPlayer.currentSong);
			}
			else{
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		/** @function next
		* @desc Find the index of the currently playing song, increases the index by 1, and plays the song in the songs array at the new index.
		* @param {Object} song
		*/
		SongPlayer.next = function(){
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			if(currentSongIndex > currentAlbum.songs.length -1){
				stopSong(SongPlayer.currentSong);
			}
			else{
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['Fixtures', SongPlayer]);
})();