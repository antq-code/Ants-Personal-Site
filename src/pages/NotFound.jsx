import { Link } from 'react-router-dom';
import '../components/Button.css';

export default function NotFound() {
  return (
    <div className="aura-bg">
      <div className="aura-layer-1" aria-hidden="true" />
      <div className="aura-layer-2" aria-hidden="true" />
      <div className="aura-layer-5" aria-hidden="true" />
      <div className="aura-grain" aria-hidden="true" />
      <div className="aura-content" style={{ justifyContent: 'center', alignItems: 'center', gap: 24 }}>
        <h1 className="section-title">Page coming soon</h1>
        <Link to="/" className="btn glow-on-hover">
          Back home
        </Link>
      </div>
    </div>
  );
}
