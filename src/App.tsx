import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, ArrowRight, Sparkles } from 'lucide-react';

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [showRedirect, setShowRedirect] = useState<boolean>(false);
  const [showIframe, setShowIframe] = useState<boolean>(false);

  const mobileUrl = 'https://reabotlives.netlify.app';
  const desktopUrl = 'https://portfolio-wine-kappa-99.vercel.app/';

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsLoading(false);
          setTimeout(() => setShowRedirect(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (showRedirect) {
      // Automatically transition to iframe after showing the redirect screen for a few seconds
      const autoTransitionTimer = setTimeout(() => {
        setShowIframe(true);
      }, 3000); // Show the detection screen for 3 seconds before seamless iframe load

      return () => clearTimeout(autoTransitionTimer);
    }
  }, [showRedirect]);

  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );

  if (showIframe) {
    const targetUrl = isMobile ? mobileUrl : desktopUrl;
    return (
      <div className="w-full h-screen overflow-hidden">
        <iframe
          src={targetUrl}
          className="w-full h-full border-0"
          title="Portfolio Experience"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center relative overflow-hidden">
        <Particles />
        
        <div className="text-center z-10 max-w-md mx-auto px-6">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Loading Portfolio
            </h1>
            <p className="text-purple-200 text-lg">
              Preparing your personalized experience...
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-4 backdrop-blur-sm">
            <div 
              className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-white/80 text-sm">
            {progress < 30 ? 'Detecting your device...' :
             progress < 60 ? 'Optimizing experience...' :
             progress < 90 ? 'Almost ready...' :
             'Ready to go!'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      <Particles />
      
      <div className={`text-center z-10 max-w-2xl mx-auto px-6 transition-all duration-1000 ${showRedirect ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {isMobile ? (
            <Smartphone className="w-20 h-20 text-blue-400 mx-auto mb-6 animate-bounce" />
          ) : (
            <Monitor className="w-20 h-20 text-green-400 mx-auto mb-6 animate-bounce" />
          )}
          
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Welcome!
          </h1>
          
          <div className="mb-8">
            {isMobile ? (
              <div>
                <p className="text-xl text-blue-200 mb-4 leading-relaxed">
                  📱 Detected mobile device
                </p>
                <p className="text-lg text-white/90 mb-2">
                  We're preparing the mobile-optimized portfolio
                </p>
                <p className="text-purple-300 text-base">
                  💡 View on laptop to get an entirely different experience!
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xl text-green-200 mb-4 leading-relaxed">
                  💻 Detected wide screen device
                </p>
                <p className="text-lg text-white/90">
                  We're preparing the desktop experience for wider screens
                </p>
              </div>
            )}
          </div>
          
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform animate-pulse">
            Loading Portfolio
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>
          
          <div className="mt-6 text-white/60 text-sm">
            Transitioning seamlessly...
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;