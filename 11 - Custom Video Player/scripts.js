const player=document.querySelector('.player');
const video=document.querySelector('.viewer');
const progress=document.querySelector('.progress');
const progressBar=document.querySelector('.progress__filled');
const toggle=document.querySelector('.toggle');
const ranges=document.querySelectorAll('.player__slider');
const skipButtons=document.querySelectorAll('[data-skip]');

/***********************************Play and pause functionality************************************ */
function togglePlay(){
    // if(video.paused)
    //     video.play();
    // else
    //     video.pause();
    const method=video.paused ? 'play':'pause';  //Shorter to write
    video[method]();
}
video.addEventListener("click",togglePlay);
toggle.addEventListener("click",togglePlay);

//Now logo of toggle button is changes corresponding to whether video is being played or not, video can be paused due to some pop-up or other interruption, so we'll make it a general one rather than adding it in the togglePlay() functoin

function updateButton(){
   const symbol=this.paused ? '►' : '||';
   toggle.textContent=symbol;
}
video.addEventListener('play',updateButton);
video.addEventListener('pause', updateButton);

/********************************Skip the video functionality************************************ */
function skip(){
    //console.log(this.dataset) or console.log(this.dataset.skip), could have done using this also
    let skip=this.getAttribute('data-skip');
    // console.log(typeof(skip)); it is string, Change it to float 
    video.currentTime += parseFloat(skip);
}
for(let i of skipButtons){
    i.addEventListener("click",skip);
}

/*************************************Range Update************************************************** */

function handleRangeUpdate(){
    var property=this.getAttribute('name'); //or just this.name
    video[property]=this.value;
}
ranges.forEach(range => range.addEventListener("change",handleRangeUpdate));

/*************************************Handle Progess**************************************************/

//For automatically updating according to the current time
function handleProgress(){
    const percent=parseFloat((video.currentTime/video.duration)*100);
    progressBar.style.flexBasis=`${percent}%`;
}
video.addEventListener("timeupdate", handleProgress);

//For updating when we click on the progress bar
function scrub(e){
    video.currentTime=e.offsetX*video.duration/(progress.offsetWidth); //offsetX works relative to the total offsetWdith that is width in pixels in a particular responsive device
}
progress.addEventListener("click",scrub);

//Handling for clicking and dragging the progress bar
let mouseDown=false;
progress.addEventListener("mousedown",() => mouseDown=true);
progress.addEventListener("mouseup",() => mouseDown=false);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
