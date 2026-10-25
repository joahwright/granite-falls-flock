/* Set the initial position once; listeners can then seek anywhere in the full meeting. */
(() => {
  const players = [...document.querySelectorAll('#meeting-2026-10-21 audio')];
  for (const player of players) {
    const start = Number(player.dataset.start || 0);
    const position = () => { if (start && Number.isFinite(player.duration)) player.currentTime = Math.min(start, player.duration); };
    if (player.readyState >= 1) position();
    else player.addEventListener('loadedmetadata', position, { once: true });
    player.addEventListener('play', () => {
      for (const other of players) if (other !== player) other.pause();
    });
  }
})();
