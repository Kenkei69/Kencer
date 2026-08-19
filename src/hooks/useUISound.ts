import { useCallback, useState } from 'react';

// Minimal UI sound system using Web Audio API
// No external sound files needed - generates sounds programmatically

const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

function playTick() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.frequency.setValueAtTime(4000, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.03);
  gain.gain.setValueAtTime(0.03, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.05);
}

function playClick() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.08);
  gain.gain.setValueAtTime(0.05, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.1);
}

function playWhoosh() {
  if (!audioContext) return;
  const bufferSize = audioContext.sampleRate * 0.3;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  
  const filter = audioContext.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, audioContext.currentTime);
  filter.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
  filter.Q.value = 2;
  
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.02, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
  
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  source.start(audioContext.currentTime);
}

export function useUISound() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('sound') === 'true';
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('sound', String(next));
      // Resume audio context on user interaction
      if (next && audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }
      return next;
    });
  }, []);

  const tick = useCallback(() => {
    if (soundEnabled) playTick();
  }, [soundEnabled]);

  const click = useCallback(() => {
    if (soundEnabled) playClick();
  }, [soundEnabled]);

  const whoosh = useCallback(() => {
    if (soundEnabled) playWhoosh();
  }, [soundEnabled]);

  return { soundEnabled, toggleSound, tick, click, whoosh };
}
