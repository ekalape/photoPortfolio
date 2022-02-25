const cards = document.querySelectorAll(".card_container");
const win_screen = document.querySelector(".win_container");
const result = document.querySelector(".result");
const score_screen = document.querySelector(".score_container");
const controlBtns = document.querySelectorAll("button");

const theme_btn = document.querySelector(".theme_btn");

const p_sound_short = new Audio("assets/sounds/paper_short.wav");
const p_sound_long = new Audio("assets/sounds/paper_long.mp3");
const click_sound = new Audio("assets/sounds/click.wav");
const disappear_sound = new Audio("assets/sounds/disapp.mp3");
const win_sound = new Audio("assets/sounds/win_sound.wav");

let theme;

window.addEventListener("load", () => {
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  } else {
    theme = "light";
  }
  theme = theme === "light" ? "dark" : "light";
  changeTheme(theme);
});

controlBtns.forEach((btn) => btn.addEventListener("click", btnOnClickAction));

let oneCardIsOpen = false;
let first, second;
let lockBoard = false;
let counter = 0;
let couples = 0;
startGame();

function startGame() {
  cards.forEach((card) => {
    card.classList.remove("invisible");

    card.addEventListener("click", openCard);
  });
  resetCards();
  (function shuffleCards() {
    cards.forEach((card) => {
      let pos = Math.floor(Math.random() * 12);
      card.style.order = pos;
    });
  })();
}

function openCard() {
  if (lockBoard === true || this === first) return;
  p_sound_short.play();
  if (!oneCardIsOpen) {
    oneCardIsOpen = true;
    this.classList.add("openCard");

    first = this;
  } else {
    this.classList.add("openCard");
    second = this;
    /* oneCardIsOpen = false; */
    lockBoard = true;

    check();
  }
}

function check() {
  counter++;

  if (first.dataset.name === second.dataset.name) {
    disableCards();
  } else {
    closeCards();
  }
}

function closeCards() {
  setTimeout(() => {
    p_sound_long.volume = 0.2;
    p_sound_long.play();

    first.classList.remove("openCard");
    second.classList.remove("openCard");

    resetCards();
  }, 500);
}
function disableCards() {
  setTimeout(() => {
    couples++;
    disappear_sound.play();
    first.classList.add("invisible");
    second.classList.add("invisible");
    first.removeEventListener("click", openCard);
    second.removeEventListener("click", openCard);

    if (couples === 6) {
      endGame();
      return;
    }
    resetCards();
  }, 500);
}
function resetCards() {
  [lockBoard, oneCardIsOpen] = [false, false];
  [first, second] = [null, null];

  cards.forEach((card) => card.classList.remove("openCard"));
}
function endGame() {
  setTimeout(() => {
    win_sound.play();
    showWinScreen();
    addToStorage();
    [counter, couples] = [0, 0];
  }, 500);
}
function addToStorage() {
  let record = latestScore();
  if (!localStorage.getItem("score")) {
    localStorage.setItem("score", record);
  } else {
    let score = localStorage.getItem("score").split("--");
    if (score.length < 10) {
      score.push(record);
    } else {
      score.shift();
      score.push(record);
    }
    localStorage.setItem("score", score.join("--"));
  }
}

function showWinScreen() {
  win_screen.classList.add("win_appear");
  result.textContent = `You made ${counter} tries.`;
}

/* document.querySelector(".temp").onclick = () => {
  showWinScreen();
}; */

function btnOnClickAction(e) {
  click_sound.play();
  if (e.target.classList.contains("no")) {
    win_screen.classList.remove("win_appear");
    score_screen.classList.remove("win_appear");
    if (e.target.classList.contains("cancel_btn")) {
      score_screen.classList.add("win_appear");
      showScore();
    }
  }
  if (e.target.classList.contains("play_again")) {
    win_screen.classList.remove("win_appear");
    score_screen.classList.remove("win_appear");
    cards.forEach((card) => {
      startGame();
    });
  }
  if (e.target.classList.contains("score_btn")) {
    if (score_screen.classList.contains("win_appear")) {
      score_screen.classList.remove("win_appear");
    } else {
      win_screen.classList.remove("win_appear");
      score_screen.classList.add("win_appear");
      showScore();
    }
  }
  if (e.target.classList.contains("theme_btn")) {
    changeTheme(theme);
  }
}

function showScore() {
  if (!localStorage.getItem("score")) {
    document.querySelector(
      ".ach_list"
    ).innerHTML = `There is no any achievement...`;
  } else {
    let sc = localStorage.getItem("score").split("--");
    let ach = "";
    for (let i = 0; i < sc.length; i++) {
      ach += `<li>${sc[i]}</li>`;
    }
    document.querySelector(".ach_list").innerHTML = ach;
  }
}

const latestScore = () => {
  const moment = new Date();

  return `${moment.getDate()}/${
    moment.getMonth() + 1
  }/${moment.getFullYear()} at ${moment.getHours()}:${
    moment.getMinutes() > 10 ? moment.getMinutes() : "0" + moment.getMinutes()
  } game completed with ${counter} tries.`;
};

function changeTheme(e) {
  if (e === "light") {
    theme = "dark";

    theme_btn.textContent = "Light theme";
    document.documentElement.style.setProperty("--c_light", "#160b1d");
    document.documentElement.style.setProperty("--c_medium", "#1b0a30");
    document.documentElement.style.setProperty("--c_bg", "#325038");
    document.documentElement.style.setProperty(
      "--filter_for_logo",
      "invert(85%) sepia(57%) saturate(3220%) hue-rotate(338deg) brightness(104%) contrast(101%)"
    );
    document.documentElement.style.setProperty("--c_accent_purple", "#ffcb20");
    document.documentElement.style.setProperty(
      "--c_accent_purple_dark",
      "#c98900"
    );
    document.documentElement.style.setProperty("--c_accent_yellow", "#1c0a29");
    document.documentElement.style.setProperty(
      "--c_yellow_transparent",
      "#1c0a29f3"
    );
  } else {
    theme_btn.textContent = "Dark theme";
    theme = "light";

    document.documentElement.style.setProperty("--c_light", "#ffffff");
    document.documentElement.style.setProperty("--c_medium", "#dbcdff");
    document.documentElement.style.setProperty("--c_bg", "#325038");
    document.documentElement.style.setProperty(
      "--filter_for_logo",
      "invert(10%) sepia(65%) saturate(3453%) hue-rotate(261deg) brightness(64%) contrast(104%)"
    );
    document.documentElement.style.setProperty("--c_accent_purple", "#270a47");
    document.documentElement.style.setProperty(
      "--c_accent_purple_dark",
      "#1f033d"
    );
    document.documentElement.style.setProperty("--c_accent_yellow", "#ffffa4");
    document.documentElement.style.setProperty(
      "--c_yellow_transparent",
      "#ffffa4f5"
    );
  }
  /* localStorage.setItem("theme", theme); */
}
window.addEventListener("beforeunload", () => {
  localStorage.setItem("theme", theme);
});
