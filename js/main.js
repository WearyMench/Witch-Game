let playerLeft = 350;
let playerBottom = 30;
let ballClass = ["small", "medium", "big"];
let ballHeight = 500;
let interval1;
let interval2;
let int;
let count = 0;
let counter = 0;
let seconds = 10;

const grid = document.querySelector(".grid");
const player = document.createElement("div");
const score = document.createElement("div");
const timer = document.createElement("div");
let textGameOver = document.createElement("div");

function createPlayer() {
  player.classList.add("player");
  grid.appendChild(player);
  player.style.left = playerLeft + "px";
  player.style.bottom = playerBottom + "px";
}

class Ball {
  constructor(ballHeight) {
    this.left = Math.random() * 670;
    this.bottom = ballHeight;

    this.visual = document.createElement("div");
    const visual = this.visual;
    visual.classList.add(ballclass());
    visual.style.left = this.left + "px";

    //Movement and collisions
    interval1 = setInterval(() => {
      ballHeight -= 4;
      visual.style.bottom = ballHeight + "px";
      if (ballHeight <= 0) {
        grid.removeChild(visual);
      }
    }, 30);

    interval2 = setInterval(() => {
      if (
        ballHeight <= playerBottom + 50 &&
        ballHeight >= playerBottom &&
        this.left <= playerLeft + 32 &&
        this.left >= playerLeft
      ) {
        visual.classList.add("visible");
        count = contador(visual.classList[0]);
        counter = counter + count;
      }
    }, 30);

    grid.appendChild(visual);
  }
}

function createBalls() {
  new Ball(ballHeight);
  int = setInterval(() => {
    new Ball(ballHeight);
  }, 3000);
}

function ballclass() {
  let randomNumber = Math.floor(Math.random() * 100);
  if (randomNumber < 5) {
    return ballClass[2];
  } else if (randomNumber < 30) {
    return ballClass[1];
  } else if (randomNumber >= 30) {
    return ballClass[0];
  }
}

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      playerLeft = playerLeft - 10;
      player.classList.add("run");
      player.classList.add("run-left");
      break;
    case "ArrowRight":
      playerLeft = playerLeft + 10;
      player.classList.add("run");
      player.classList.remove("player-left");
      break;
    default:
      break;
  }
  player.style.left = playerLeft + "px";
  setInterval(() => {
    if (playerLeft >= 670) {
      player.style.left = 660 + "px";
    }
    if (playerLeft <= 0) {
      player.style.left = 0 + "px";
    }
  }, 20);
});

addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player.classList.remove("run");
      player.classList.remove("run-left");
      player.classList.add("player-left");
      break;
    case "ArrowRight":
      player.classList.remove("run");
      player.classList.remove("player-left");
      break;
    default:
      break;
  }
});

function contador(clase) {
  if (clase == "small") {
    return 1;
  } else if (clase == "medium") {
    return 3;
  } else if (clase == "big") {
    return 5;
  }
}

function createScore() {
  score.classList.add("score");
  setInterval(() => {
    if (counter < 10) {
      score.textContent = "0" + counter;
    } else {
      score.innerHTML = counter;
    }
  }, 30);
  grid.appendChild(score);
}

function createTimer() {
  timer.classList.add("timer");
  let intTime = setInterval(() => {
    if (seconds < 10) {
      timer.textContent = `00:0${seconds}`;
    } else {
      timer.textContent = `00:${seconds}`;
    }
    seconds--;
    if (seconds < 0) {
      clearInterval(intTime);
      timer.textContent = "00:00";
      gameOver();
    }
  }, 1000);

  grid.appendChild(timer);
}

function gameOver() {
  clearInterval(int);
  grid.removeChild(player);

  textGameOver.classList.add("gameover");
  textGameOver.textContent = "Game Over";
  grid.appendChild(textGameOver);

  let buton1 = document.createElement("button");
  buton1.classList.add("buton");
  buton1.textContent = "Play Again";
  grid.appendChild(buton1);

  buton1.addEventListener("click", () => {
    grid.removeChild(textGameOver);
    grid.removeChild(buton1);
    seconds = 10;
    counter = 0;
    start();
  });
}

function start() {
  createPlayer();
  createBalls();
  createScore();
  createTimer();
}

function inicio() {
  let buton2 = document.createElement("button");
  buton2.classList.add("start");
  buton2.textContent = "Start";
  grid.appendChild(buton2);

  buton2.addEventListener("click", () => {
    start();
    grid.removeChild(buton2);
  });
}

inicio();
