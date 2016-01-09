(function(){
	function SongPlayer() {
		/**
		* @desc SongPlayer service; play, pause audio files
		* @type {Object} SongPlayer
		**/
		var SongPlayer = {};
		/**
		* @desc Current playing song as Song object
		* @type {Object} song
		**/
		var currentSong = null;
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
				currentBuzzObject.stop();
				currentSong.playing = null;
			}
			
			currentBuzzObject = new buzz.sound(song.audioURL,{
				formats: ['mp3'],
				preload: true
			});
			
			currentSong = song;
		};
		
		/**
		* @function playSong
		* @desc Used in conjuction with setSong; plays audio file as currentBuzzObject and set playing propert to treu
		* @param {Object} song
		*/
		var playSong = function(song){
			currentBuzzObject.play();
			song.playing = true;
		};
		
		/**
		* @function play
		* @desc  Plays audio file and adjust playing property to true.
		* @param {Object} song
		*/
		SongPlayer.play = function(song){
			if(currentSong !== song){
				setSong(song);
				playSong(song);
				currentSong = song;
			}
			else if(currentSong === song && currentBuzzObject.isPaused()){
				playSong(song);
			}
		};
		
		/**
		* @function pause
		* @desc  Pauses audio files and adjusts playing property to false.
		* @param {Object} song
		*/
		SongPlayer.pause = function(song){
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();