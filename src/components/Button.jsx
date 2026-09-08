import './Button.css';

export default function Button({ children, onClick, href, type = 'button', target, disabled = false }) {
  const className = 'btn glow-on-hover';

  if (href) {
    const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
    return (
      <a href={href} className={className} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}