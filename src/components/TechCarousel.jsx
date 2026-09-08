import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import './TechCarousel.css';

// Renders 3 copies of the project list back-to-back so dragging past either end
// can be silently snapped back into the middle copy - the visual "loop".
export default function TechCarousel({ projects }) {
  const trackRef = useRef(null);
  const cardStepRef = useRef(0);
  const dragRef = useRef({ dragging: false, moved: false, startX: 0, startScrollLeft: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const n = projects.length;
  const tripled = [...projects, ...projects, ...projects];

  const measureStep = () => {
    const track = trackRef.current;
    const slides = track?.querySelectorAll('.techCarouselSlide');
    if (!slides || slides.length < 2) return 0;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  };

  const scrollToIndex = (index, behavior = 'smooth') => {
    const step = cardStepRef.current || measureStep();
    trackRef.current?.scrollTo({ left: index * step, behavior });
  };

  // Center on the middle copy after mount and whenever the layout resizes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const center = () => {
      cardStepRef.current = measureStep();
      if (cardStepRef.current) track.scrollLeft = n * cardStepRef.current;
    };
    center();

    const ro = new ResizeObserver(center);
    ro.observe(track);
    return () => ro.disconnect();
  }, [n]);

  // Track which real project is centered, and silently rewrap once we drift
  // into the clone copies on either side.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame;

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const step = cardStepRef.current || measureStep();
        if (!step) return;
        const rawIndex = Math.round(track.scrollLeft / step);

        if (rawIndex < n * 0.5) {
          track.scrollLeft += n * step;
        } else if (rawIndex >= n * 2.5) {
          track.scrollLeft -= n * step;
        }

        setActiveIndex(((rawIndex % n) + n) % n);
      });
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [n]);

  const onPointerDown = (e) => {
    const track = trackRef.current;
    dragRef.current = {
      dragging: true,
      moved: false,
      startX: e.clientX,
      startScrollLeft: track.scrollLeft,
    };
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const state = dragRef.current;
    if (!state.dragging) return;
    const dx = e.clientX - state.startX;
    if (Math.abs(dx) > 3) state.moved = true;
    trackRef.current.scrollLeft = state.startScrollLeft - dx;
  };

  const endDrag = () => {
    const state = dragRef.current;
    if (!state.dragging) return;
    state.dragging = false;
    if (state.moved) {
      const step = cardStepRef.current || measureStep();
      scrollToIndex(Math.round(trackRef.current.scrollLeft / step));
    }
  };

  const goTo = (index) => {
    const step = cardStepRef.current || measureStep();
    const current = Math.round(trackRef.current.scrollLeft / step);
    const currentWrapped = ((current % n) + n) % n;
    let delta = index - currentWrapped;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    scrollToIndex(current + delta);
  };

  return (
    <div className="techCarousel">
      <div
        className="techCarouselTrack"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {tripled.map((project, i) => (
          <div className="techCarouselSlide" key={`${project.id}-${i}`}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="techCarouselDots" role="tablist" aria-label="Project slides">
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            className={`techCarouselDot${i === activeIndex ? ' techCarouselDot--active' : ''}`}
            aria-label={`Go to ${project.title}`}
            aria-selected={i === activeIndex}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
