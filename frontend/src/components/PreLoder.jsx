import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import gear from '../assets/gear.png';

const PreLoder = ({ loadingProgress }) => {
  const progressRef = useRef(null);
  const gearRef = useRef(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      width: `${loadingProgress}%`,
      ease: 'power3.out',
      duration: 0.5,
    });

    gsap.to(gearRef.current, {
      rotate: 360,
      ease: 'linear',
      duration: 2,
      repeat: -1,
    });
  }, [loadingProgress]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800">
      <div className="mb-8">
        <img
          ref={gearRef}
          src={gear}
          alt="Spinning Gear"
          className="w-20 h-20 mx-auto"
          aria-label="Loading gear animation"
        />
      </div>
      <div className="w-3/4 sm:w-1/2">
        <div className="relative w-full h-4 bg-gray-300 rounded overflow-hidden shadow-lg">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded transition-all ease-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p className="mt-4 text-white text-center" aria-live="polite">
          Loading... {Math.round(loadingProgress)}%
        </p>
      </div>
    </div>
  );
};

export default PreLoder;
