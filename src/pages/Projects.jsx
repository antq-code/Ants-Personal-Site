import { useEffect } from 'react';
import WorldSection from '../components/WorldSection';
import ProjectGallery from '../components/ProjectGallery';
import { projects } from '../data/projects';

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aura-bg">
      <div className="aura-layer-1" aria-hidden="true" />
      <div className="aura-layer-2" aria-hidden="true" />
      <div className="aura-layer-3" aria-hidden="true" />
      <div className="aura-layer-4" aria-hidden="true" />
      <div className="aura-layer-5" aria-hidden="true" />
      <div className="aura-layer-6" aria-hidden="true" />
      <div className="aura-grain" aria-hidden="true" />
      <div className="aura-fade-top" aria-hidden="true" />
      <div className="aura-fade-bottom" aria-hidden="true" />
      <div className="aura-content">
        <WorldSection id="projects" label="Projects" variant="void">
          <h1 className="section-title">Projects</h1>
          <ProjectGallery projects={projects} />
        </WorldSection>
      </div>
    </div>
  );
}
