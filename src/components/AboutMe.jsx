import me from '../assets/me.jpg';

export default function AboutMe() {
  return (
    <div className="sectionPlaceholder">
      <div className="sectionPlaceholderText">
        <h2 className="section-title">About Me</h2>
        <p className="section-body">
          I am a Computer Engineering Student at Texas A&amp;M University.
        </p>
        <p className="section-body">
          {/* TODO: replace with a second paragraph — interests, goals, background, etc. */}
          Add a second paragraph here.
        </p>
      </div>
      <img src={me} alt="Portrait of Antony Quach" className="sectionPlaceholderImage" />
    </div>
  );
}
