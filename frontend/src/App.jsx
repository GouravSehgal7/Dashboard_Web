/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PreLoder from './components/PreLoder';
import Mainpage from './pages/Mainpage';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadDuration = 500;

    const simulateLoading = () => {
      const startTime = performance.now();
      const intervalDuration = 50;

      const interval = setInterval(() => {
        const elapsedTime = performance.now() - startTime;
        const progress = Math.min((elapsedTime / loadDuration) * 100, 100);
        setLoadingProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      }, intervalDuration);
    };

    simulateLoading();
    return () => clearInterval(simulateLoading);
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <PreLoder loadingProgress={loadingProgress} />
      ) : (
        <Mainpage />
      )}
    </div>
  );
};

export default App;
