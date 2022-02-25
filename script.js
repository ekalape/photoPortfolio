const video = document.querySelector(".custom_video");
const videoProgressBar = document.querySelector(".video_active");
const volumeProgressBar = document.querySelector(".volume_active");
const playPause = document.querySelectorAll(".main_control");
const volBtn = document.querySelector(".volume_img");
const playBtnOnVid = document.querySelector(".onVideo");

let isPlaying = false;
let isVolume = true;
let v = volumeProgressBar.value;

video.addEventListener("timeupdate", function () {
  let duration = video.duration;
  let current = video.currentTime;
  videoProgressBar.value = (current / duration) * 100;
});

videoProgressBar.addEventListener("click", function (e) {
  let len = this.offsetWidth;
  let x = e.offsetX;
  this.value = (x / len) * 100;
  if (isPlaying) {
    video.pause();
  }
  video.currentTime = (video.duration * x) / len;
  if (isPlaying) {
    video.play();
  }
});

playPause.forEach((btn) => btn.addEventListener("click", toggleControl));
video.onclick = toggleControl;
playBtnOnVid.onclick = toggleControl;

function toggleControl() {
  if (this.classList.contains("play_pause")) {
    if (isPlaying) {
      video.pause();
      playBtnOnVid.classList.remove("transparent");
      document.querySelector(".img_onVid").src = "assets/play_onVid.png";
      isPlaying = false;
      document.querySelector(".play_pause_img").src = "assets/play_btn.png";
    } else {
      video.play();
      playBtnOnVid.classList.add("transparent");

      document.querySelector(".img_onVid").src = "assets/pause_onVid.png";
      isPlaying = true;
      document.querySelector(".play_pause_img").src = "assets/pause_btn.png";
    }
  }

  if (this.classList.contains("volume")) {
    if (isVolume) {
      video.volume = 0;
      volumeProgressBar.value = 0;
      isVolume = false;
      volBtn.src = "assets/volume_mute.png";
    } else {
      isVolume = true;
      volumeProgressBar.value = v;
      video.volume = v == 0 ? (v + 2) / 100 : v / 100;
      volBtn.src = "assets/volume_btn.png";
    }
  }
}

volumeProgressBar.addEventListener("input", function (e) {
  v = e.target.value;
  video.volume = v / 100;
  if (v == 0) {
    isVolume = false;
    volBtn.src = "assets/volume_mute.png";
  } else {
    isVolume = true;
    volBtn.src = "assets/volume_btn.png";
  }
});
