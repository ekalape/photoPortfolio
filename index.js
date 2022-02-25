import i18Obj from "./translate.js";

console.log(
  "Все требования к верстке выполнены:\n" +
    "1. Смена изображений в секции portfolio +25\n" +
    "2. Перевод страницы на два языка +25\n" +
    "3. Переключение светлой и тёмной темы +25\n" +
    "4. Доп. функционал: выбранный пользователем язык отображения страницы \nи светлая или тёмная тема сохраняются при перезагрузке страницы +5\n" +
    "5. Доп. функционал: сложные эффекты для кнопок при наведении и/или клике +5\n" +
    "\nМоя предварительная оценка - высший балл.\n"
);

/* ----------------storage------------- */
let language = "en";
let theme = "dark";

function setLocalStorage() {
  localStorage.setItem("lang", language);
  localStorage.setItem("theme", theme);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    language = localStorage.getItem("lang");
    translateAll(language);
  }
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
    if (theme == "dark") {
      theme = "light";
    } else {
      theme = "dark";
    }

    changeTheme();
  }
}
window.addEventListener("load", getLocalStorage);

/* --------------hamburger-------------- */
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".tablet-menu");

const black_bg = document.querySelector(".black-cover");
hamburger.onclick = function () {
  menu.classList.toggle("menu-opened");
  if (menu.classList.contains("menu-opened")) {
    this.classList.add("is-active");
    black_bg.classList.add("blackened");
  } else {
    this.classList.remove("is-active");
    black_bg.classList.remove("blackened");
  }
};

menu.addEventListener("click", closeMenu);

function closeMenu(event) {
  if (event.target.classList.contains("close")) {
    if (menu.classList.contains("menu-opened")) {
      menu.classList.remove("menu-opened");
      black_bg.classList.remove("blackened");
    }
    hamburger.classList.remove("is-active");
  }
}
/* -----------------------change portfolio images---------------- */
const seasonBtns = document.querySelector(".portfolio-btns");

const portPhotos = document.querySelectorAll(".portfolio-item");
const seasons = ["winter", "spring", "summer", "autumn"];
function preloadImages() {
  seasons.forEach((s) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `assets/portfolio-items/${s}/${i}.jpg`;
    }
  });
}
preloadImages();

let pressedPortfolioBtn = document.querySelector(".pressed");

seasonBtns.addEventListener("click", changeImage);
let season = "";
let pressed = "pressed";

function changeImage(e) {
  pressedPortfolioBtn.classList.remove(pressed);

  e.target.classList.add(pressed);
  pressedPortfolioBtn = e.target;
  season = e.target.dataset.season;
  /*  console.log(season); */

  if (e.target.dataset.season == "winter") {
    portPhotos.forEach(
      (p, i) => (p.src = `assets/portfolio-items/${season}/${i + 1}.jpg`)
    );
  } else if (e.target.dataset.season == "spring") {
    portPhotos.forEach(
      (p, i) => (p.src = `assets/portfolio-items/${season}/${i + 1}.jpg`)
    );
  } else if (e.target.dataset.season == "summer") {
    portPhotos.forEach(
      (p, i) => (p.src = `assets/portfolio-items/${season}/${i + 1}.jpg`)
    );
  } else if (e.target.dataset.season == "autumn") {
    portPhotos.forEach(
      (p, i) => (p.src = `assets/portfolio-items/${season}/${i + 1}.jpg`)
    );
  }
}
/* -----------translation------------ */

const translationBlocks = document.querySelectorAll("[data-i18n]");

function translateAll(str) {
  translationBlocks.forEach((text) => {
    if (text.placeholder) {
      text.placeholder = i18Obj[str][text.dataset.i18n];
      text.textContent = "";
    } else {
      text.textContent = i18Obj[str][text.dataset.i18n];
    }
  });
}

const langBtn = document.querySelectorAll(".lang");

langBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    langBtn.forEach((l) => l.classList.remove("actual", "actual-light"));
    language = e.target.id;

    e.target.classList.add("actual");

    /*  console.log(language); */
    translateAll(language);
  })
);

/* -----------switch themes----------- */

const logoIcons = document.querySelectorAll("[data-icon]");
const logoIconsPath = {
  light: {
    logo: "assets/logo1.svg",
    insta: "assets/inst1.svg",
    fb: "assets/fb1.svg",
    tw: "assets/tw1.svg",
    pinterest: "assets/pinterest1.svg",
  },
  dark: {
    logo: "assets/light_img/logo.svg",
    insta: "assets/light_img/inst.svg",
    fb: "assets/light_img/fb.svg",
    tw: "assets/light_img/tw.svg",
    pinterest: "assets/light_img/pinterest.svg",
  },
};
const switchTheme = document.querySelector(".switch-theme");
switchTheme.addEventListener("click", changeTheme);

function changeTheme() {
  switchTheme.dataset.theme = theme;

  logoIcons.forEach(
    (icon) => (icon.src = logoIconsPath[theme][icon.dataset.icon])
  );
  document.querySelectorAll(".black").forEach((x) => {
    if (theme == "dark") {
      x.classList.add("light-buttons-transp");
    } else {
      x.classList.remove("light-buttons-transp");
    }
  });
  document.querySelectorAll(".white").forEach((x) => {
    if (theme == "dark") {
      x.classList.add("light-buttons-gold");
    } else {
      x.classList.remove("light-buttons-gold");
    }
  });
  document.querySelectorAll(".input-text").forEach((x) => {
    if (theme == "dark") {
      x.classList.add("input-light");
    } else {
      x.classList.remove("input-light");
    }
  });

  if (theme === "dark") {
    // change to light
    theme = "light";
    switchTheme.dataset.theme = "light";
    /*     console.log(`theme = ${theme}`); */
    pressed = "light-pressed";
    document.querySelector("body").classList.add("lightTheme");
    pressedPortfolioBtn.classList.remove("pressed");
    pressedPortfolioBtn.classList.add("light-pressed");
    document.querySelector(".theme").src = "assets/theme_dark.svg";
    document.querySelector(".hero-bg-container").style.backgroundImage =
      "url('assets/light_img/bg.jpg')";
    document.querySelector(".withLight").style.backgroundImage =
      "url('assets/light_img/contacts.jpg')";
    document.documentElement.classList.add("lightTheme");
    document
      .querySelectorAll(".title")
      .forEach((x) => x.classList.add("lightTheme"));
    document.querySelectorAll(".section-title").forEach((x) => {
      x.classList.add("section-titleLight");
    });
    document.querySelectorAll("a").forEach((x) => x.classList.add("aLight"));
    document.querySelector(".title-contact").classList.add("aLight");
    document.querySelector(".tablet-menu").classList.add("lightTheme");
    document
      .querySelectorAll(".line")
      .forEach((x) => x.classList.add("lines-black"));
  } else {
    // change to dark
    theme = "dark";
    switchTheme.dataset.theme = "dark";
    console.log(`theme = ${theme}`);

    pressed = "pressed";

    pressedPortfolioBtn.classList.remove("light-pressed");
    pressedPortfolioBtn.classList.add("pressed");
    document.querySelector("body").classList.remove("lightTheme");
    document.querySelector(".theme").src = "assets/theme_light.svg";
    document.querySelector(".hero-bg-container").style.backgroundImage =
      "url('assets/bg.jpg')";
    document.querySelector(".withLight").style.backgroundImage =
      "url('assets/contacts-bg.jpg')";
    document.documentElement.classList.remove("lightTheme");
    document
      .querySelectorAll(".title")
      .forEach((x) => x.classList.remove("lightTheme"));
    document
      .querySelectorAll(".section-title")
      .forEach((x) => x.classList.remove("section-titleLight"));
    document.querySelectorAll("a").forEach((x) => x.classList.remove("aLight"));
    document.querySelector(".title-contact").classList.remove("aLight");
    document.querySelector(".tablet-menu").classList.remove("lightTheme");
    document
      .querySelectorAll(".line")
      .forEach((x) => x.classList.remove("lines-black"));
  }
}
