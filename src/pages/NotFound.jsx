import { Link } from 'react-router-dom';
import background from '../assets/antPurpleBG_convertedJPG.jpg';
import '../components/Button.css';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notFoundPage">
      <img src={background} alt="" className="notFoundBackground" />
      <div className="notFoundFade" aria-hidden="true" />
      <div className="notFoundContent">
        <h1 className="section-title">Page coming soon</h1>
        <Link to="/" className="btn glow-on-hover">
          Back home
        </Link>
      </div>
    </div>
  );
}
