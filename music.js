document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");
  const text = document.getElementById("music-text");

  // 1. Check if music was already playing on the last page
  const isPlaying = localStorage.getItem("musicPlaying") === "true";
  const trackPosition = localStorage.getItem("musicTime") || 0;

  // Set the song to where it left off
  audio.currentTime = trackPosition;

  // 2. If it was playing, try to resume it immediately
  if (isPlaying) {
    audio.play().then(() => {
      updateUI(true);
    }).catch(() => {
      // If the browser blocks it on a hard refresh, reset to paused UI
      updateUI(false);
      localStorage.setItem("musicPlaying", "false");
    });
  }

  // 3. The Play/Pause Button Logic
  toggleBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      updateUI(true);
    } else {
      audio.pause();
      updateUI(false);
    }
  });

  // 4. Constantly save the current timestamp as the song plays
  audio.addEventListener("timeupdate", () => {
    localStorage.setItem("musicTime", audio.currentTime);
  });

  // UI helper function
  function updateUI(playing) {
    if (playing) {
      toggleBtn.classList.add("playing");
      text.innerText = "Playing...";
      localStorage.setItem("musicPlaying", "true");
    } else {
      toggleBtn.classList.remove("playing");
      text.innerText = "Play Vibe";
      localStorage.setItem("musicPlaying", "false");
    }
  }
});