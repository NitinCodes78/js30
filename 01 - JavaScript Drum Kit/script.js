window.addEventListener("keydown",function(event){
    // const ASCIIkeyPressed=event.keyCode(gives ascii for upper cases);  or event.key.charCodeAt(0)
    const audio=document.querySelector(`audio[data-key= "${event.keyCode}"]`); //double quotes imp. and ` also
    if(audio===null) return;
    const key=document.querySelector(`.key[data-key= "${event.keyCode}"]`);
    key.classList.add('playing');
    audio.currentTime=0;  //Resets the audio currently being played, useful when we hit the same "button" in the succession, for example pressing the key 'A' again and again, it sets the audio corresponding to that key to start i.e. 0s, it can't set the audio for other key to zero because audio element here corresponds to the key pressed for example "clap.wav" for 'A', it will refer to the audio corresponding to that key to play, or being at the what current time
    // Two different types of audio can play at the same time, but a single audio can't be played twice at the same time( pressing the same key again before it's previous iteration have already completed
    audio.play();  
    function removeTransition(e){
           this.classList.remove('playing');
    }
        key.addEventListener('transitionend',removeTransition);
})