// Procedural ambient music & focus soundscapes using Web Audio API
import { MusicTrackId } from '../types';

export interface MusicTrackMeta {
  id: MusicTrackId;
  name: string;
  tagline: string;
  description: string;
  bpm: number;
}

export const MUSIC_TRACKS: MusicTrackMeta[] = [
  {
    id: 'zen',
    name: 'Zen Focus',
    tagline: 'Calm Rhodes & Pentatonic Bells',
    description: 'Gentle harmonic pentatonic chime tones over a warm low-pass drone.',
    bpm: 54
  },
  {
    id: 'deep',
    name: 'Deep Thought',
    tagline: 'Alpha Wave Ambient Drone',
    description: 'Theta/alpha resonant binaural beats and deep meditative frequencies for intense problem solving.',
    bpm: 48
  },
  {
    id: 'rain',
    name: 'Cozy Rain & Lo-Fi',
    tagline: 'Gentle Rainfall & Warm Chords',
    description: 'Filtered procedural rainfall soundscape blended with mellow floating chords.',
    bpm: 60
  },
  {
    id: 'cosmic',
    name: 'Cosmic Mind',
    tagline: 'Ethereal Celestial Harmonics',
    description: 'Slow-drifting space pads and gentle harmonic crystalline overtones.',
    bpm: 50
  }
];

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isRunning: boolean = false;
  private currentTrack: MusicTrackId = 'zen';
  private timerId: number | null = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;

        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Get live frequency heights (0-1) for UI visualizer bars
  getFrequencyLevels(barCount: number = 4): number[] {
    if (!this.analyser || !this.isRunning) {
      return Array(barCount).fill(0.1);
    }
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    const step = Math.floor(bufferLength / barCount);
    const result: number[] = [];
    for (let i = 0; i < barCount; i++) {
      let sum = 0;
      for (let j = 0; j < step; j++) {
        sum += dataArray[i * step + j] || 0;
      }
      const avg = sum / step / 255;
      result.push(Math.max(0.12, Math.min(1.0, avg * 1.5)));
    }
    return result;
  }

  start(track: MusicTrackId = 'zen', volume: number = 50) {
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    this.currentTrack = track;
    this.isRunning = true;
    this.setVolume(volume);

    // Stop previous voices/loops
    this.stopInternal();

    // Start track-specific synthesizer loop
    switch (track) {
      case 'zen':
        this.startZenSoundscape();
        break;
      case 'deep':
        this.startDeepSoundscape();
        break;
      case 'rain':
        this.startRainSoundscape();
        break;
      case 'cosmic':
        this.startCosmicSoundscape();
        break;
    }
  }

  stop() {
    this.isRunning = false;
    this.stopInternal();
  }

  setVolume(volumePercent: number) {
    if (!this.masterGain || !this.ctx) return;
    const vol = Math.max(0, Math.min(1, volumePercent / 100)) * 0.35; // keep soothing, non-distracting max volume
    this.masterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
  }

  changeTrack(track: MusicTrackId, volume: number = 50) {
    if (this.isRunning) {
      this.start(track, volume);
    } else {
      this.currentTrack = track;
    }
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }

  getCurrentTrack(): MusicTrackId {
    return this.currentTrack;
  }

  private stopInternal() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    // Stop drone oscillators
    this.droneOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.droneOscs = [];

    // Stop rain
    if (this.rainSource) {
      try {
        this.rainSource.stop();
        this.rainSource.disconnect();
      } catch {}
      this.rainSource = null;
    }
  }

  // 1. Zen Soundscape: Pentatonic Bell notes over warm harmonic root pad
  private startZenSoundscape() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Gentle warm base drone (F2 + C3)
    const baseFreqs = [87.31, 130.81, 174.61]; // F2, C3, F3
    baseFreqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.droneOscs.push(osc);
    });

    // F Major Pentatonic scale frequencies for bells (F3, G3, A3, C4, D4, F4, G4, A4, C5)
    const bellNotes = [174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00, 523.25];

    const playBell = () => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      const note = bellNotes[Math.floor(Math.random() * bellNotes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.0);
    };

    // Play first note immediately, then schedule gentle rhythm
    playBell();
    this.timerId = window.setInterval(() => {
      playBell();
      if (Math.random() > 0.4) {
        setTimeout(playBell, 400 + Math.random() * 400);
      }
    }, 2400);
  }

  // 2. Deep Thought: 432Hz meditative drone with Alpha wave delta
  private startDeepSoundscape() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Binaural Alpha beat (Left: 108Hz, Right: 118Hz -> 10Hz Alpha pulse)
    const pairs = [
      { freq: 108, pan: -0.8 },
      { freq: 118, pan: 0.8 },
      { freq: 216, pan: -0.3 },
      { freq: 226, pan: 0.3 }
    ];

    pairs.forEach(({ freq, pan }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);

      if (panner) {
        panner.pan.setValueAtTime(pan, ctx.currentTime);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain!);
      } else {
        osc.connect(gain);
        gain.connect(this.masterGain!);
      }

      osc.start();
      this.droneOscs.push(osc);
    });

    // Occasional low-register singing bowl harmonic
    const bowlChimes = [288, 432, 576];
    const playBowl = () => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      const note = bowlChimes[Math.floor(Math.random() * bowlChimes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.8);
    };

    playBowl();
    this.timerId = window.setInterval(playBowl, 4200);
  }

  // 3. Rain & Lo-Fi: Procedural pink noise rain + soft warm electric piano chords
  private startRainSoundscape() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Create 4 seconds of procedural pink noise for rain
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    const whiteSource = ctx.createBufferSource();
    whiteSource.buffer = noiseBuffer;
    whiteSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(0.7, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.09, ctx.currentTime);

    whiteSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    whiteSource.start();
    this.rainSource = whiteSource;

    // Gentle Lo-Fi chord pads (Dmaj7, Bm7, Gmaj7, A7sus)
    const chords = [
      [146.83, 220.00, 277.18, 329.63], // D3, A3, C#4, E4
      [123.47, 185.00, 246.94, 293.66], // B2, F#3, B3, D4
      [98.00, 196.00, 246.94, 293.66],  // G2, G3, B3, D4
      [110.00, 164.81, 220.00, 293.66]  // A2, E3, A3, D4
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      chord.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const flt = this.ctx!.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        flt.type = 'lowpass';
        flt.frequency.setValueAtTime(450, this.ctx!.currentTime);

        const now = this.ctx!.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.035, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.6);

        osc.connect(flt);
        flt.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 3.8);
      });
    };

    playChord();
    this.timerId = window.setInterval(playChord, 3800);
  }

  // 4. Cosmic Mind: Slow ambient harmonic space drone + crystalline stars
  private startCosmicSoundscape() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Root drone
    const droneFreqs = [65.41, 130.81, 196.00, 261.63]; // C2, C3, G3, C4
    droneFreqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start();
      this.droneOscs.push(osc);
    });

    // Crystalline shimmering star tones
    const celestialNotes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    const playStarTone = () => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      const note = celestialNotes[Math.floor(Math.random() * celestialNotes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.4);
    };

    playStarTone();
    this.timerId = window.setInterval(() => {
      playStarTone();
      if (Math.random() > 0.5) {
        setTimeout(playStarTone, 500);
      }
    }, 2800);
  }
}

export const music = new AmbientMusicEngine();
