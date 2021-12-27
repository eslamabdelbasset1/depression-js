const videoElement1 = document.getElementById('vid1');
const videoElement2 = document.getElementById('vid2');
const videoElement1Con = document.getElementById('vid1Con');
const videoElement2Con = document.getElementById('vid2Con');


const sections = document.querySelectorAll('.section');
let takenHugs = 0;
let hugs = [
    './hugs/1.gif',
    './hugs/2.gif',
    './hugs/3.gif',
    './hugs/4.gif',
    './hugs/5.gif',
    './hugs/6.gif',
    './hugs/7.gif',
    './hugs/8.gif',
    './hugs/9.gif',
    './hugs/10.gif',
];

let shuffle = () => {
    let currentIndex = hugs.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [hugs[currentIndex], hugs[randomIndex]] = [
        hugs[randomIndex], hugs[currentIndex]];
    }
    var img = new Image();
    img.src=hugs[0]; 
  }

shuffle();
document.getElementById('hugBtn').addEventListener('click', () => {
    sections.forEach(element => {
        element.classList.remove('active');
    });
    changeHug();
    document.getElementById('hug').classList.add('active');
});
document.getElementById('m3lshBtn').addEventListener('click', () => {
    sections.forEach(element => {
        element.classList.remove('active');
    });
    
    document.getElementById('blueVid').play();
    document.getElementById('blue').classList.add('active');
});

document.getElementById('btn2').addEventListener('click', () => {
    sections.forEach(element => {
        element.classList.remove('active');
    });
    document.getElementById('sad').classList.add('active');
});


let changeHug = () => {
    if(takenHugs === 5){
        document.getElementById('block_hugs').style.display = 'flex';
        document.getElementById('m3lsh_pic').style.display = 'none';
        document.getElementById('hugAgain').innerText = 'آخر واحد يسطا بالله عليك';
    }
    if(takenHugs === 6){
        document.getElementById('block_hugs').style.display = 'none';
        document.getElementById('m3lsh_pic').style.display = 'inline';
        document.getElementById('hugAgain').style.display = 'none';
        return
    }
    document.getElementById('m3lsh_pic').setAttribute('src',  hugs[takenHugs] )
    takenHugs++;
    var img = new Image();
    img.src=hugs[takenHugs];
}

document.getElementById('hugAgain').addEventListener('click', changeHug);




document.getElementById('startBtn').addEventListener('click', (event) => {
    document.getElementById('vidsCont').style.display = 'block';
    document.getElementById('texts').style.display = 'none';

    disableScroll();
    goToScroll(videoElement1Con.id);
    videoElement1.play();
    videoElement2Con.style.display = "none"

    setInterval(() => {
        if(videoElement1.currentTime > 6){
            videoElement1.pause();
            videoElement2Con.style.display = "flex"
            console.log(videoElement1.currentTime)
            goToScroll(videoElement2Con.id)
            videoElement2.play();
            videoElement1Con.style.display = "none"

        }
    },500)
})

let goToScroll = (elm) => {
    location.href = `#${elm}`;
}

// call this to Disable scrolling
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
