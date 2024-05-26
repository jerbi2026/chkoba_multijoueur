document.addEventListener('DOMContentLoaded', function () {
   
    var audio = document.getElementById('myAudio');
    
    
    var volumeRange = document.getElementById('volumeRange');
    
    
    audio.volume = volumeRange.value / 100;

  
    volumeRange.addEventListener('input', function () {
        
        audio.volume = volumeRange.value / 100;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('myAudio');
    var playButton = document.getElementById('playButton');

    playButton.addEventListener('click', function () {
        audio.play();
        playButton.style.display = 'none';
    });

  
    audio.addEventListener('ended', function () {
        playButton.style.display = 'inline-block';
    });
});