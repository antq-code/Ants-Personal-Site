import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import TechCarousel from './TechCarousel';
import { projects as allProjects } from '../data/projects';
import './Technicals.css';

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}

export default function Technicals({
  projects = allProjects,
  heading = 'Technologies, Skills, Projects',
}) {
  const isMobile = useIsMobile(900);

  return (
    <div>
      <h2 className="section-title">{heading}</h2>
      {isMobile ? (
        <TechCarousel projects={projects} />
      ) : (
        <div className="techGrid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      )}
    </div>
  );
}
