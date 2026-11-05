let gameActive = false;

const car = document.getElementById('car');
const goal = document.getElementById('goal');
const message = document.getElementById('message');
const retryBtn = document.getElementById('retry-btn');
const speedBar = document.getElementById('speed-bar');
const streakDisplay = document.getElementById('streak');
const highscoreDisplay = document.getElementById('highscore');
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");

let posX = 0;
let velocity = 0;
let isAccelerating = false;
let streak = 0;
let highscore = localStorage.getItem("parkingHighscore") || 0;
let level = 1;

highscoreDisplay.textContent = highscore;

const acceleration = 0.4;
const friction = 0.98;
const stopThreshold = 0.15;

window.addEventListener('keydown', e => { if(e.code==="Space") isAccelerating=true; });
window.addEventListener('keyup', e => { if(e.code==="Space") isAccelerating=false; });
window.addEventListener('mousedown', ()=> isAccelerating=true);
window.addEventListener('mouseup', ()=> isAccelerating=false);

retryBtn.addEventListener('click', resetGame);

startBtn.onclick = function(){
    startScreen.style.display="none";
    startTrafficLight();
};

function startTrafficLight(){
    red.classList.add("active");

    setTimeout(()=>{
        red.classList.remove("active");
        yellow.classList.add("active");
    },1000);

    setTimeout(()=>{
        yellow.classList.remove("active");
        green.classList.add("active");
        gameActive = true;
        update();
    },2000);
}

function update(){
    if(!gameActive) return;

    if(isAccelerating){
        velocity+=acceleration;
        car.style.transform="rotate(-5deg) scale(1.05)";
    }else{
        car.style.transform="rotate(0deg) scale(1)";
    }

    velocity*=friction;
    posX+=velocity;
    car.style.left=posX+"px";

    let speedPercent=Math.min(Math.abs(velocity)*5,100);
    speedBar.style.width=speedPercent+"%";

    if(!isAccelerating && velocity<stopThreshold && posX>5){
        velocity=0;
        checkResult();
    }

    if(posX>window.innerWidth){
        endGame("💥 オーバーラン！",false);
    }

    requestAnimationFrame(update);
}

function checkResult(){
    const carRect=car.getBoundingClientRect();
    const goalRect=goal.getBoundingClientRect();
    const carCenter=carRect.left+carRect.width/2;
    const goalCenter=goalRect.left+goalRect.width/2;
    const distance=Math.abs(carCenter-goalCenter);

    if(distance<10){
        endGame("🎯 PERFECT!",true);
    }else if(distance<30){
        endGame("👍 GOOD!",true);
    }else if(carRect.right>goalRect.left && carRect.left<goalRect.right){
        endGame("😅 CLOSE!",true);
    }else{
        endGame("💥 MISS!",false);
    }
}

function endGame(text,success){
    gameActive=false;
    message.textContent=text;

    if(success){
        streak++;
        level++;
        goal.style.width=Math.max(40,120-(level*10))+"px";
        car.classList.add("win-effect");
        setTimeout(()=>car.classList.remove("win-effect"),600);
    }else{
        streak=0;
        level=1;
        goal.style.width="120px";
    }

    if(streak>highscore){
        highscore=streak;
        localStorage.setItem("parkingHighscore",highscore);
    }

    streakDisplay.textContent=streak;
    highscoreDisplay.textContent=highscore;
}

function resetGame(){
    posX=0;
    velocity=0;
    gameActive=true;
    isAccelerating=false;
    message.textContent="";
    car.style.left="0px";
    update();
}
function startTrafficLight(){

    red.classList.add("active");

    setTimeout(()=>{
        red.classList.remove("active");
        yellow.classList.add("active");
    },1000);

    setTimeout(()=>{
        yellow.classList.remove("active");
        green.classList.add("active");

        gameActive = true;
        update();
    },2000);
}
startBtn.onclick = function(){
    startScreen.style.display="none";

    document.getElementById("traffic-light").style.display="flex";

    startTrafficLight();
};
startBtn.onclick = function(){
    startScreen.style.display="none";

    const tl = document.getElementById("traffic-light");
    tl.style.display="flex";

    startTrafficLight();
};
function createStars(){
    const starsContainer = document.createElement("div");
    starsContainer.classList.add("stars");
    document.body.appendChild(starsContainer);

    for(let i=0;i<80;i++){
        const star=document.createElement("div");
        star.classList.add("star");
        star.style.left=Math.random()*100+"vw";
        star.style.top=Math.random()*100+"vh";
        star.style.animationDuration=(Math.random()*2+1)+"s";
        starsContainer.appendChild(star);
    }
}

createStars();
function createClouds(){
    for(let i=0;i<3;i++){
        const cloud=document.createElement("div");
        cloud.classList.add("cloud");
        cloud.style.top=(40 + i*40)+"px";
        cloud.style.animationDuration=(20+i*5)+"s";
        document.body.appendChild(cloud);
    }
}
createClouds();
function startRain(){
    for(let i=0;i<100;i++){
        const drop=document.createElement("div");
        drop.classList.add("rain-drop");
        drop.style.left=Math.random()*100+"vw";
        drop.style.animationDuration=(Math.random()*0.5+0.5)+"s";
        document.body.appendChild(drop);
    }
}
function spawnOtherCars(){
    setInterval(()=>{
        const other=document.createElement("div");
        other.classList.add("other-car");
        other.style.bottom=(30 + Math.random()*40)+"px";
        document.getElementById("game-board").appendChild(other);

        setTimeout(()=>other.remove(),5000);
    },3000);
}

spawnOtherCars();
modeToggle.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("day-mode");
});
function spawnPolice(){
    setInterval(()=>{
        const police=document.createElement("div");
        police.classList.add("police-car");
        police.style.bottom=(30 + Math.random()*40)+"px";
        document.getElementById("game-board").appendChild(police);

        setTimeout(()=>police.remove(),4000);
    },8000);
}
spawnPolice();
function checkCollision(){
    const carRect=car.getBoundingClientRect();
    const obstacles=document.querySelectorAll(".other-car, .police-car");

    obstacles.forEach(obj=>{
        const rect=obj.getBoundingClientRect();
        if(
            carRect.left < rect.right &&
            carRect.right > rect.left &&
            carRect.top < rect.bottom &&
            carRect.bottom > rect.top
        ){
            endGame("💥 CRASH!!",false);
            shakeCamera();
        }
    });
}
checkCollision();
const fuelBar=document.getElementById("fuel-bar");
let fuel=100;
fuel -= 0.05;
fuelBar.style.width=fuel+"%";

if(fuel < 30){
    fuelBar.style.background="orange";
}
if(fuel < 10){
    fuelBar.style.background="red";
}

if(fuel <= 0){
    endGame("⛽ OUT OF FUEL!",false);
}


function shakeCamera(){
    document.body.classList.add("shake");
    setTimeout(()=>{
        document.body.classList.remove("shake");
    },400);
}
