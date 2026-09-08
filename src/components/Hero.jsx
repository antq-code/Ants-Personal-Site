import { lazy, Suspense } from 'react';
import logo from '../assets/X_WHITE.png';
import raysImage from '../assets/purple_shape_fx.png';
import background from '../assets/antPurpleBG_convertedJPG.jpg';
import './Hero.css';

const MagicRings = lazy(() => import('../effects/MagicRing.jsx'));

export default function Hero() {
 

  return (
    <div className="heroSection">
        <img src={background} alt="purple background" className="heroBackground"/>
        <div className="heroFade" aria-hidden="true" />
        <div className="heroVisuals">
            <img src={raysImage} alt="purple rays" className="heroRays"/>
            <Suspense fallback={null}>
              <MagicRings
              color="rgb(140, 82, 254)"
              colorTwo="rgb(229, 174, 254)"
              ringCount={4}
              speed={1.5}
              attenuation={20}
              lineThickness={2.5}
              baseRadius={0.3}
              radiusStep={0.08}
              opacity={0.65}
              blur={2}
              noiseAmount={0.05}
              />
            </Suspense>
            <img src={logo} alt="" className="heroLogo" />
        </div>
        <div className="typingContainer">
          <p className="typingText">
            Hi, I'm Antony, welcome to my website!
          </p>

        </div>


      
    </div>
  );
}