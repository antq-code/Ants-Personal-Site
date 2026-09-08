import { Link, useLocation, useNavigate } from 'react-router-dom';
import AQ from '../assets/AQ_STROKE.png';
import { scrollToSectionId } from '../utils/scrollTo';
import './Nav.css';

export default function Nav({ pages = [] }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event, href) => {
    if (!href.startsWith('/#')) return; // regular page routes - let Link navigate normally

    const id = href.slice(2);
    event.preventDefault();

    if (location.pathname === '/') {
      scrollToSectionId(id);
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <nav className="floating-nav" aria-label="Primary">
      <Link to="/" className="floating-nav__logo" aria-label="Home">
        <img src={AQ} alt="AQ" />
      </Link>

      <ul className="floating-nav__links">
        {pages.map((page) => (
          <li key={page.href}>
            <Link to={page.href} onClick={(e) => handleClick(e, page.href)}>
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
