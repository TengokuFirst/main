const avatars = ['assets/images/ava_1.jpg', 'assets/images/ava_2.jpg', 'assets/images/ava_3.jpg', 'assets/images/ava_4.jpg'];
let avatarIndex = 0;
const avatar = document.querySelector('#profile-avatar');
document.querySelector('.prev').addEventListener('click', () => { avatarIndex = (avatarIndex - 1 + avatars.length) % avatars.length; avatar.src = avatars[avatarIndex]; });
document.querySelector('.next').addEventListener('click', () => { avatarIndex = (avatarIndex + 1) % avatars.length; avatar.src = avatars[avatarIndex]; });
document.querySelectorAll('.item-card[data-href]').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('a') || window.getSelection().toString()) return;
    window.open(card.dataset.href, '_blank', 'noopener,noreferrer');
  });
});
const audio = document.querySelector('.player-audio');
const toggle = document.querySelector('.player-toggle');
const timeline = document.querySelector('.player-timeline');
const progress = document.querySelector('.player-progress');
const time = document.querySelector('.player-time');
const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
toggle.addEventListener('click', () => audio.paused ? audio.play() : audio.pause());
audio.addEventListener('play', () => { toggle.textContent = '❚❚'; toggle.setAttribute('aria-label', 'Пауза'); });
audio.addEventListener('pause', () => { toggle.textContent = '▶'; toggle.setAttribute('aria-label', 'Воспроизвести'); });
audio.addEventListener('timeupdate', () => {
  progress.style.width = audio.duration ? `${audio.currentTime / audio.duration * 100}%` : '0';
  time.textContent = formatTime(audio.currentTime);
});
timeline.addEventListener('click', (event) => {
  if (audio.duration) audio.currentTime = event.offsetX / timeline.clientWidth * audio.duration;
});
