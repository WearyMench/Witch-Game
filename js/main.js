/**
 *
 * The game consists of a character who moves from side to side to collect the shiny balls that fall from the sky.
 * There are three types of balls that give different power values.
 * When the time is up if the character has not got enough magic, the loss animation is shown.
 * If enough magic is achieved then the victory animation is shown.
 *
 * TO DO
 *
 * remove divs of balls with ballHeight < 0
 * fix score
 * clean
 */

let playerLeft = 350;
let playerBottom = 30;
let ballClass = ["small", "medium", "big"];
let ballHeight = 500;
let AnimationInterval;
let createBallInterval;
let out1;
let out2;
let count = 0;
let counter = 0;
let seconds = 20;
let monsterLeft = 600;

const grid = document.querySelector(".grid");
const player = document.createElement("div");
const score = document.createElement("div");
const timer = document.createElement("div");
const monster = document.createElement("div");
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
    setInterval(() => {
      ballHeight -= 4;
      visual.style.bottom = ballHeight + "px";
      if (ballHeight <= 0) {
        ballHeight = 0;
        visual.classList.add("visible");
      }
    }, 30);

    setInterval(() => {
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
  createBallInterval = setInterval(() => {
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
      score.textContent = `0${counter}/100`;
    } else {
      score.innerHTML = `${counter}/100`;
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

const loseAnimation = () => {
  grid.appendChild(monster);
  monster.classList.remove("visible");
  monster.classList.remove("monsterDead");
  monster.classList.remove("monster-atack");
  monster.classList.remove("monsterIdle");
  monster.classList.add("monster-run");

  AnimationInterval = setInterval(() => {
    if (playerLeft > 260) playerLeft -= 5;
    else if (playerLeft < 260) playerLeft += 5;

    player.style.left = playerLeft + "px";

    if (monsterLeft > 300) {
      monsterLeft -= 5;
      monster.style.left = monsterLeft + "px";
      player.classList.add("charge");
    }

    if (monsterLeft === 300) {
      monster.classList.add("monster-atack");
      monster.classList.remove("monster-run");
      player.classList.remove("charge");
      player.classList.add("damage");
      out1 = setTimeout(() => {
        monster.classList.remove("monster-atack");
        monster.classList.add("monsterIdle");
        player.classList.add("dead");
        player.classList.remove("damage");
        out2 = setTimeout(() => {
          player.classList.add("visible");
          player.classList.remove("dead");
          clearInterval(AnimationInterval);
        }, 600);
      }, 1800);
    }
  }, 30);

  monster.style.top = 290 + "px";
};

const winAnimation = () => {
  grid.appendChild(monster);
  monster.classList.add("monster-run");
  monster.classList.remove("monsterDead");
  monster.classList.remove("monsterIdle");
  monster.classList.remove("visible");

  AnimationInterval = setInterval(() => {
    if (playerLeft > 260) playerLeft -= 5;
    else if (playerLeft < 260) playerLeft += 5;

    player.classList.remove("player-left");
    player.style.left = playerLeft + "px";

    if (monsterLeft > 300) {
      monsterLeft -= 5;
      monster.style.left = monsterLeft + "px";
      player.classList.add("charge");
    }

    if (monsterLeft === 300) {
      monster.classList.remove("monster-run");
      monster.classList.add("takeHit");
      player.classList.remove("charge");
      player.classList.add("atack");
      out1 = setTimeout(() => {
        monster.classList.remove("takeHit");
        player.classList.remove("atack");
        monster.classList.add("monsterDead");
        out2 = setTimeout(() => {
          monster.classList.add("visible");
        }, 900);
      }, 2000);
      clearInterval(AnimationInterval);
    }
  }, 30);

  monster.style.top = 290 + "px";
};

function gameOver() {
  clearInterval(createBallInterval);

  textGameOver.classList.add("gameover");
  if (counter < 100) {
    textGameOver.textContent = "Time is Over";
    loseAnimation();
  } else {
    textGameOver.textContent = "Well done";
    winAnimation();
  }
  grid.appendChild(textGameOver);

  let buttonPlayAgain = document.createElement("button");
  buttonPlayAgain.classList.add("buton");
  buttonPlayAgain.textContent = "Play Again";
  setTimeout(() => {
    grid.appendChild(buttonPlayAgain);
  }, 6000);

  let counterInterval = setInterval(() => {
    if (counter > 0 && player.classList[1] === "charge") {
      counter--;
    }
  }, 8);

  buttonPlayAgain.addEventListener("click", () => {
    grid.removeChild(textGameOver);
    grid.removeChild(buttonPlayAgain);
    clearInterval(AnimationInterval);
    clearInterval(counterInterval);
    clearTimeout(out1);
    clearTimeout(out2);
    monster.classList.remove("monsterIdle");
    grid.removeChild(monster);
    player.classList.remove("visible");
    player.classList.remove("charge");
    monsterLeft = 600;
    seconds = 20;
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
  let buttonStart = document.createElement("button");
  buttonStart.classList.add("start");
  buttonStart.textContent = "Start";
  grid.appendChild(buttonStart);

  buttonStart.addEventListener("click", () => {
    start();
    grid.removeChild(buttonStart);
  });
}

inicio();
