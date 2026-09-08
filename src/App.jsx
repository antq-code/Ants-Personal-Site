import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

//----COMPONENTS
import LoadingIntro from './components/LoadingIntro';
import Nav from './components/Nav';
import FunXFact from './components/FunXFact';

//----PAGES
import Home from './pages/Home';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';

//----PAGE LINKS
const pages = [
  { label: 'Academics', href: '/academics' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Hobbies', href: '/hobbies' },
  { label: 'Graphics', href: '/design' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/#contacts' },
];

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/*----LOADING X-Screen----*/}
      <LoadingIntro onComplete={() => setIntroDone(true)} />

      {/*----FLOATING NAV: hidden until the intro finishes----*/}
      {introDone && <Nav pages={pages} />}
      {introDone && <FunXFact />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
