function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function animatedScrollTo(targetY, duration = 700) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime;

  function step(timestamp) {
    if (startTime === undefined) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const NAV_CLEARANCE = 40; // extra breathing room below the fixed floating nav

export function scrollToSectionId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const navHeight = document.querySelector('.floating-nav')?.getBoundingClientRect().height ?? 0;
  const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - NAV_CLEARANCE;
  animatedScrollTo(Math.max(targetY, 0));
}
