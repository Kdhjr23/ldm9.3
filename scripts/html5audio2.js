


var progressTimer;

var playButton2;
var stopButton2;
var activityIndicator2;
var textPosition2;

function onError(error) 
{
	console.log(error.message);
}

function onConfirmRetry(button) {
	if (button == 1) {
		html5audio2.play();
	}
}

function pad2(number) {
	return (number < 10 ? '0' : '') + number
}

var myaudioURL = 'http://www.directlinkupload.com/uploads/207.30.161.207/lwbd.mp3';
var myaudio = new Audio(myaudioURL);
var isPlaying = false;
var readyStateInterval = null;

var html5audio2 = {
	play: function()
	{
		isPlaying = true;
		myaudio.play();
	
		readyStateInterval = setInterval(function(){
			 if (myaudio.readyState <= 2) {
				 playButton2.style.display = 'none';
				 activityIndicator2.style.display = 'block';
				 textPosition2.innerHTML = 'loading...';
			 }
		},1000);
		myaudio.addEventListener("timeupdate", function() {
			 var s = parseInt(myaudio.currentTime % 60);
			 var m = parseInt((myaudio.currentTime / 60) % 60);
			 var h = parseInt(((myaudio.currentTime / 60) / 60) % 60);
			 if (isPlaying && myaudio.currentTime > 0) {
				 textPosition2.innerHTML = pad2(h) + ':' + pad2(m) + ':' + pad2(s);
			 }
		}, false);
		myaudio.addEventListener("error", function() {
			 console.log('myaudio ERROR');
		}, false);
		myaudio.addEventListener("canplay", function() {
			 console.log('myaudio CAN PLAY');
		}, false);
		myaudio.addEventListener("waiting", function() {
			 //console.log('myaudio WAITING');
			 isPlaying = false;
			 playButton2.style.display = 'none';
			 stopButton2.style.display = 'none';
			 activityIndicator2.style.display = 'block';
		}, false);
		myaudio.addEventListener("playing", function() {
			 isPlaying = true;
			 playButton2.style.display = 'none';
			 activityIndicator2.style.display = 'none';
			 stopButton2.style.display = 'block';
		}, false);
		myaudio.addEventListener("ended", function() {
			 //console.log('myaudio ENDED');
			 html5audio2.stop();
			 // navigator.notification.alert('Streaming failed. Possibly due to a network error.', null, 'Stream error', 'OK');
			 navigator.notification.confirm(
				'Streaming failed. Possibly due to a network error.', // message
				onConfirmRetry,	// callback to invoke with index of button pressed
				'Stream error',	// title
				'Retry,OK'		// buttonLabels
			 );
		}, false);
	},
	pause: function() {
		isPlaying = false;
		clearInterval(readyStateInterval);
		myaudio.pause();
		stopButton2.style.display = 'none';
		activityIndicator2.style.display = 'none';
		playButton2.style.display = 'block';
	},
	stop: function() {
		isPlaying = false;
		clearInterval(readyStateInterval);
		myaudio.pause();
		stopButton2.style.display = 'none';
		activityIndicator2.style.display = 'none';
		playButton2.style.display = 'block';
		myaudio = null;
		myaudio = new Audio(myaudioURL);
		textPosition2.innerHTML = '';
	}
};