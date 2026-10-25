const video = document.querySelector(".work-video");
const clipButtons = document.querySelectorAll(".clip-button");
const clipLabel = document.querySelector(".feature-time");
const audioToggle = document.querySelector(".audio-toggle");
let selectedClip = "01";

video.muted = false;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "--:--";
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
};

video.addEventListener("loadedmetadata", () => {
  clipLabel.textContent = `CUT ${selectedClip} / ${formatTime(video.duration)}`;
});

video.addEventListener("error", () => {
  clipLabel.textContent = `CUT ${selectedClip} / UNAVAILABLE`;
});

video.addEventListener("volumechange", () => {
  const isMuted = video.muted || video.volume === 0;
  audioToggle.setAttribute("aria-pressed", String(isMuted));
  audioToggle.setAttribute("aria-label", isMuted ? "Unmute video audio" : "Mute video audio");
  audioToggle.querySelector("span").textContent = isMuted ? "AUDIO OFF" : "AUDIO ON";
  audioToggle.classList.toggle("is-muted", isMuted);
});

audioToggle.addEventListener("click", () => {
  video.muted = !video.muted;
});

clipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedClip = button.querySelector("span").textContent;
    clipButtons.forEach((clipButton) => {
      const isSelected = clipButton === button;
      clipButton.classList.toggle("is-active", isSelected);
      clipButton.setAttribute("aria-pressed", String(isSelected));
    });

    video.pause();
    video.poster = button.dataset.poster;
    video.src = button.dataset.video;
    clipLabel.textContent = `LOADING CUT ${selectedClip}`;
    video.load();
    video.play().catch(() => {
      clipLabel.textContent = `CUT ${selectedClip} / PRESS PLAY`;
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(event.currentTarget).get("email");
  const recipient = event.currentTarget.dataset.recipient;
  const subject = encodeURIComponent("Let's work together");
  const body = encodeURIComponent(`Hi Rafi,\n\nI'd like to start a conversation. You can reach me at ${email}.`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
