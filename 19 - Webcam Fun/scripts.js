const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap'); //audio

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
     .then(localMediaStream=>{
       //console.log(localMediaStream);localMediaStream is an object and now we'll have to give this object as a link to our video element
      //   The following has been depreceated by major browsers as of Chrome and Firefox.
      //   video.src = window.URL.createObjectURL(localMediaStream);
         video.srcObject=localMediaStream;
         video.play();
     });
}

function paintToCanvas(){
  const width=video.videoWidth;
  const height=video.videoHeight;
  canvas.width=width;
  canvas.height=height;
  return setInterval(()=>{
    // The drawImage() method draws an image, canvas, or video onto the canvas.
     ctx.drawImage(video,0,0,width,height); 
     //Get out the pixels
     //Filter is basically messing with rgb values of pixels and other properties
     let pixels=ctx.getImageData(0,0,width,height); //pixels.data is an array that contain rgba values
     pixels=rgbSplit(pixels);
     ctx.globalAlpha=0.1; //This is blur that'll always be taken
     ctx.putImageData(pixels, 0, 0);
  },16); //Every 16 milliseconds
}

function takePhoto(){
  snap.currentTime=0;
  snap.play();

  //Take the data out of the canvas, returns a data URL containing a representation of the image in the format specified by the type parameter.
  const data=canvas.toDataURL('image/jpeg'); //could set image/png
  //Now let's create a link from where we can download the image
  const link=document.createElement('a');
  link.href='data';
  //Now we want image to be downloaded when we click on it, so let's add a download attribute
  // The download attribute specifies that the target (the file specified in the href attribute) will be downloaded when a user clicks on the hyperlink. The optional value of the download attribute will be the new name of the file after it is downloaded
  link.setAttribute('download','handsome');
  //we'll make the image work as a link
  link.innerHTML=`<img src=${data} alt="handsome man">`;
  strip.insertBefore(link,strip.firstChild); //first parameter is the node to be inserted and second parameter tells us before what it has to be inserted
}
function redEffect(pixels){
   for(let i=0; i<pixels.data.length;i+=4){
       pixels.data[i+0]=pixels.data[i+0]+100; //Red
       pixels.data[i+1]=pixels.data[i+1]-50; //Green
       pixels.data[i+2]=pixels.data[i+2]*0.5; //Blue
       pixels.data[i+3]=pixels.data[i+3]+10; //Blur
   }
   return pixels; //very important
}
function rgbSplit(pixels){
   for(let i=0; i<pixels.data.length;i+=4){
       pixels.data[i-150]=pixels.data[i+0]+100; //Red
       pixels.data[i+100]=pixels.data[i+1]-50; //Green
       pixels.data[i-150]=pixels.data[i+2]*0.5; //Blue
       pixels.data[i+3]=pixels.data[i+3]+10; //Blur
   }
   return pixels; //very important to return
}
video.addEventListener("canplay", paintToCanvas); //it tells that when the video is ready to be played like after buffering and all