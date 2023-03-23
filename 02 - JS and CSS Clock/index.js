const secondHand=document.querySelector('.second-hand');
const minuteHand=document.querySelector('.minute-hand');
const hourHand=document.querySelector('.hour-hand');
function setDate(){
    const d = new Date();
    var hour=d.getHours();
    var minutes=d.getMinutes();
    var seconds=d.getSeconds();
    const secondsDegree=seconds*6+90;
    const minuteDegree=minutes*6+90;
    const hourDegree=hour*30+90;
    secondHand.style.transform=`rotate(${secondsDegree}deg)`;
    minuteHand.style.transform=`rotate(${minuteDegree}deg)`;
    hourHand.style.transform=`rotate(${hourDegree}deg)`;
}
setInterval(setDate,1000);
