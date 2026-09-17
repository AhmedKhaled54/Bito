document.addEventListener('DOMContentLoaded', () => {
  const opening = document.querySelector('.opening');
  const audio = document.querySelector('#weddingMusic');
  const player = document.querySelector('.music-player');
  const playerState = player?.querySelector('.music-state');
  const setPlayerState = (isPlaying) => { player?.classList.toggle('playing', isPlaying); player?.setAttribute('aria-pressed', String(isPlaying)); player?.setAttribute('aria-label', isPlaying ? 'Pause wedding music' : 'Play wedding music'); if (playerState) playerState.textContent = isPlaying ? 'Pause' : 'Play'; };
  const playMusic = async () => { if (!audio) return; try { await audio.play(); setPlayerState(true); } catch { setPlayerState(false); } };
  document.querySelector('.open-button')?.addEventListener('click', () => { playMusic(); opening?.classList.add('is-open'); document.body.classList.add('invitation-open'); });
  player?.addEventListener('click', () => { if (!audio) return; audio.paused ? playMusic() : audio.pause(); });
  audio?.addEventListener('pause', () => setPlayerState(false));
  audio?.addEventListener('play', () => setPlayerState(true));
  audio?.addEventListener('error', () => { setPlayerState(false); if (playerState) playerState.textContent = 'Unavailable'; });

  const target = new Date(document.querySelector('main')?.dataset.weddingDate ?? '').getTime();
  const clock = document.querySelector('.clock');
  const calendarSentence = document.querySelector('#countdownSentence');
  const renderCalendar = () => { const grid = document.querySelector('#weddingCalendar'); const title = document.querySelector('#calendarMonth'); if (!grid || !title || Number.isNaN(target)) return; const date = new Date(target); const year = date.getFullYear(), month = date.getMonth(); title.textContent = date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }); const firstMondayIndex = (new Date(year, month, 1).getDay() + 6) % 7; const days = new Date(year, month + 1, 0).getDate(); grid.replaceChildren(); for (let i = 0; i < firstMondayIndex; i++) grid.append(document.createElement('span')); for (let day = 1; day <= days; day++) { const cell = document.createElement('span'); cell.textContent = day; if (day === date.getDate()) { cell.className = 'wedding-day'; cell.setAttribute('aria-label', `Wedding day, ${day}`); } grid.append(cell); } };
  const tick = () => { const distance = target - Date.now(); if (distance <= 0) { if (clock) clock.innerHTML = '<p class="day-message">Today is the day ❤️</p>'; if (calendarSentence) calendarSentence.textContent = 'Today is the day ❤️'; return; } const values = [Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24, Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60]; const labels = ['days','hours','minutes','seconds']; labels.forEach((key,i) => { document.querySelectorAll(`[data-unit="${key}"],[data-hero-unit="${key}"]`).forEach(unit => unit.textContent = String(values[i]).padStart(2,'0')); }); if (calendarSentence) calendarSentence.textContent = `${values[0]} days ${values[1]} hours ${values[2]} min ${values[3]} sec`; };
  renderCalendar(); tick(); setInterval(tick, 1000);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold:.15});
  document.querySelectorAll('.moment').forEach(el => observer.observe(el));
  const galleryItems = document.querySelectorAll('.gallery-item');
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('gallery-animations-ready');
    galleryItems.forEach(el => observer.observe(el));
  } else {
    galleryItems.forEach(el => el.classList.add('visible'));
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('.gallery-album-frame').forEach((galleryFrame, index) => {
    let paused = false, dragging = false, startX = 0, startScroll = 0;
    const direction = index === 0 ? 1 : -1, speed = index === 0 ? .58 : .46;
    const autoScroll = () => { if (!paused && !dragging) { const max = galleryFrame.scrollWidth - galleryFrame.clientWidth; if (max <= 0) return; if (direction > 0) galleryFrame.scrollLeft = galleryFrame.scrollLeft >= max - 1 ? 0 : galleryFrame.scrollLeft + speed; else galleryFrame.scrollLeft = galleryFrame.scrollLeft <= 1 ? max : galleryFrame.scrollLeft - speed; } };
    if (direction < 0) galleryFrame.scrollLeft = galleryFrame.scrollWidth - galleryFrame.clientWidth;
    ['mouseenter', 'focusin'].forEach(event => galleryFrame.addEventListener(event, () => paused = true)); ['mouseleave', 'focusout'].forEach(event => galleryFrame.addEventListener(event, () => paused = false));
    galleryFrame.addEventListener('pointerdown', event => { dragging = true; startX = event.clientX; startScroll = galleryFrame.scrollLeft; galleryFrame.classList.add('is-dragging'); galleryFrame.setPointerCapture(event.pointerId); });
    galleryFrame.addEventListener('pointermove', event => { if (dragging) galleryFrame.scrollLeft = startScroll - (event.clientX - startX); });
    const stopDrag = () => { dragging = false; galleryFrame.classList.remove('is-dragging'); }; galleryFrame.addEventListener('pointerup', stopDrag); galleryFrame.addEventListener('pointercancel', stopDrag); window.setInterval(autoScroll, 30);
  });
  const box = document.querySelector('.lightbox'), boxImage = box?.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => { if (!box || !boxImage) return; boxImage.src = item.querySelector('img')?.src ?? ''; box.classList.add('active'); }));
  document.querySelector('.lightbox button')?.addEventListener('click', () => box?.classList.remove('active'));
  box?.addEventListener('click', e => { if(e.target === box) box.classList.remove('active'); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') box?.classList.remove('active'); });

  document.querySelector('.share-invitation')?.addEventListener('click', async () => {
    const button = document.querySelector('.share-invitation');
    const status = document.querySelector('.share-status');
    const shareData = { title: document.title, text: 'You are warmly invited to celebrate with us.', url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(window.location.href); if (status) status.textContent = 'Invitation link copied.'; }
    } catch (error) {
      if (error?.name !== 'AbortError' && status) status.textContent = 'Unable to share right now.';
    } finally { button?.blur(); }
  });
});
