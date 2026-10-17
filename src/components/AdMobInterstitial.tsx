import React, { useEffect, useState } from 'react';
import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { sound } from '../services/sound';

interface AdMobInterstitialProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

export const AdMobInterstitial: React.FC<AdMobInterstitialProps> = ({
  isOpen,
  onClose,
  soundEnabled
}) => {
  const [countdown, setCountdown] = useState(3);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      setCanSkip(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      id="admob-interstitial-modal"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div 
        id="admob-interstitial-card"
        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* AdMob header bar with countdown and skip */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              Ad · Google AdMob
            </span>
            <span className="text-xs text-slate-400">Intermission</span>
          </div>

          <div>
            {canSkip ? (
              <button
                id="admob-interstitial-skip-btn"
                type="button"
                onClick={() => {
                  sound.playPop(soundEnabled);
                  onClose();
                }}
                className="flex items-center gap-1 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full transition-colors border border-slate-700"
              >
                <span>Skip Ad</span>
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs font-medium text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                Reward in {countdown}s
              </span>
            )}
          </div>
        </div>

        {/* Ad Body Content */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>

          <h3 className="text-lg font-bold text-white mb-1">
            Great Thinking Session!
          </h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            You just solved another set of teasers! This simulated AdMob interstitial spaces out your practice sessions comfortably without interrupting your thought process.
          </p>

          <div className="w-full bg-slate-950/80 border border-slate-850 rounded-xl p-3.5 mb-5 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Instant Local Architecture</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Every single teaser, hint, solution, and daily streak is loaded and saved directly on your device.
            </p>
          </div>

          <button
            id="admob-interstitial-continue-btn"
            type="button"
            onClick={() => {
              sound.playPop(soundEnabled);
              onClose();
            }}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
          >
            Continue Brain Workout
          </button>
        </div>
      </div>
    </div>
  );
};
