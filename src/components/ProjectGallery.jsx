import { useEffect, useState } from 'react';
import './Technicals.css'; // reuses .techCardHeader/.techCardTitle/.techCardDate/.techCardRole/.techStack/.techCardDescription
import './ProjectGallery.css';

const AUTOPLAY_MS = 3500;

export default function ProjectGallery({ projects }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const selected = projects[selectedIndex];
  const slideCount = selected.galleryCount || 1;

  // jump back to the first gallery slide whenever the selected project changes
  useEffect(() => {
    setSlideIndex(0);
  }, [selectedIndex]);

  // auto-advance the gallery slides for the currently selected project
  useEffect(() => {
    if (slideCount <= 1) return undefined;
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slideCount);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [selected, slideCount]);

  const select = (index) => setSelectedIndex(index);

  return (
    <div className="projectGallery">
      <div className="projectGalleryGrid">
        {projects.map((project, index) => (
          <button
            type="button"
            key={project.id}
            className={`projectGalleryItem glow-on-hover${
              index === selectedIndex ? ' projectGalleryItem--selected' : ''
            }`}
            onMouseEnter={() => select(index)}
            onFocus={() => select(index)}
            onClick={() => select(index)}
            aria-pressed={index === selectedIndex}
          >
            <span className="projectGalleryItemImage" aria-hidden="true">
              <span>Add image</span>
            </span>
            <span className="projectGalleryItemTitle">{project.title}</span>
          </button>
        ))}
      </div>

      <div className="projectGalleryDetail">
        <div className="projectGalleryCarousel">
          {Array.from({ length: slideCount }).map((_, i) => (
            <div
              key={i}
              className={`projectGalleryCarouselSlide${
                i === slideIndex ? ' projectGalleryCarouselSlide--active' : ''
              }`}
              aria-hidden={i !== slideIndex}
            >
              <span>Add image {i + 1}</span>
            </div>
          ))}

          {slideCount > 1 && (
            <div className="projectGalleryCarouselDots">
              {Array.from({ length: slideCount }).map((_, i) => (
                <span
                  key={i}
                  className={`projectGalleryCarouselDot${
                    i === slideIndex ? ' projectGalleryCarouselDot--active' : ''
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="projectGalleryInfo">
          <div className="techCardHeader">
            <h3 className="techCardTitle">{selected.title}</h3>
            <span className="techCardDate">{selected.dateRange}</span>
          </div>
          <p className="techCardRole">{selected.role}</p>
          <ul className="techStack">
            {selected.techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <p className="techCardDescription">{selected.description}</p>
        </div>
      </div>
    </div>
  );
}
