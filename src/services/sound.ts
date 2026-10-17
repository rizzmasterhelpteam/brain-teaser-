// Web Audio API sound synthesizer with high-fidelity acoustic & electronic sound effects
class SoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private getVolumeFactor(volume = 80): number {
    return Math.max(0.01, Math.min(1.0, (volume / 100)));
  }

  // Crisp tactile button/chip tap
  playTap(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.14 * factor, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // AudioContext blocked
    }
  }

  // Backward compatibility alias
  playPop(enabled = true, volume = 80) {
    this.playTap(enabled, volume);
  }

  // 3D Card Flip whoosh with dynamic swoosh resonance
  playCardFlip(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const now = this.ctx.currentTime;

      // Resonant noise swoosh
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.22);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(1200, now + 0.1);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.22);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18 * factor, now + 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch {}
  }

  // Card slide transition between teasers
  playCardSlide(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.1);
      
      gain.gain.setValueAtTime(0.1 * factor, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } catch {}
  }

  // Magical celestial harp sparkle when opening hint
  playHint(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const now = this.ctx.currentTime;
      const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6 shimmer
      
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.045;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12 * factor, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {}
  }

  // Triumphant victory fanfare chord on solve
  playSuccess(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const now = this.ctx.currentTime;
      // C Major arpeggio + fanfare chord (C5, E5, G5, C6)
      const arpeggio = [523.25, 659.25, 783.99, 1046.50];

      arpeggio.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + i * 0.07;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2 * factor, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.6);
      });
    } catch {}
  }

  // Backward compatibility chime
  playChime(enabled = true, volume = 80) {
    this.playSuccess(enabled, volume);
  }

  // Gentle encouraging soft dual-tone when missed
  playMiss(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const now = this.ctx.currentTime;
      const notes = [392.00, 329.63]; // G4 down to E4

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + i * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1 * factor, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {}
  }

  // Streak level-up sparkle cascade
  playStreak(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + i * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12 * factor, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.38);
      });
    } catch {}
  }

  // Organic woodblock tick for the think timer
  playTimerTick(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

      gain.gain.setValueAtTime(0.06 * factor, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  // Dice roll / shuffle sound effect
  playDice(enabled = true, volume = 80) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const factor = this.getVolumeFactor(volume);
      const now = this.ctx.currentTime;
      [360, 480, 420, 560].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + i * 0.04;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.08 * factor, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.04);
      });
    } catch {}
  }

  // Haptic feedback
  vibrate(pattern: number | number[] = 15, enabled = true) {
    if (!enabled) return;
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {}
  }
}

export const sound = new SoundEffects();
