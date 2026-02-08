import { createDeskThing } from '@deskthing/server';
import { GenericTransitData } from '@deskthing/types';
import path from 'path';
import fs from 'fs';
import os from 'os';
const sound = require('sound-play');

// Define custom types for type-safe communication
type ToClientData = 
  | { type: 'sound_status'; payload: { appId: string; playing: boolean } }
  | { type: 'all_stopped'; payload: {} };

type FromClientData = 
  | GenericTransitData
  | { type: 'data'; request: 'play_sound'; payload: { appId: string; soundFile: string; interval: number; volume: number } }
  | { type: 'data'; request: 'stop_sound'; payload: { appId: string } }
  | { type: 'data'; request: 'stop_all'; payload: {} }
  | { type: 'data'; request: 'test_sound'; payload: { soundFile: string; volume: number } };

const DeskThing = createDeskThing<FromClientData, ToClientData>();
export { DeskThing };

// Store active sound intervals
let activeSounds: { [appId: string]: NodeJS.Timeout } = {};

// Sound playback function using sound-play
const playSound = async (soundFile: string, volume: number = 0.7): Promise<void> => {
  const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  const soundPath = path.join(appData, "deskthing", "apps", "busything", "client", "sounds", soundFile);
  
  if (!fs.existsSync(soundPath)) {
    console.error(`[BusyThing] Sound file not found: ${soundPath}`);
    return;
  }
  
  try {
    console.log(`[BusyThing] Playing sound: ${soundPath} at volume ${volume}`);
    await sound.play(soundPath, volume);
  } catch (err) {
    console.error(`[BusyThing] Failed to play sound: ${err}`);
  }
};

// Stop a specific sound
const stopSound = (appId: string): void => {
  if (activeSounds[appId]) {
    clearInterval(activeSounds[appId]);
    delete activeSounds[appId];
    
    // Send status update to client
    DeskThing.send({
      type: 'sound_status',
      payload: { appId, playing: false }
    });
  }
};

// Stop all sounds
const stopAllSounds = (): void => {
  Object.keys(activeSounds).forEach(appId => {
    clearInterval(activeSounds[appId]);
  });
  activeSounds = {};
  
  // Send status update to client
  DeskThing.send({
    type: 'all_stopped',
    payload: {}
  });
};

// Start playing a sound on an interval
const startSound = (appId: string, soundFile: string, interval: number, volume: number): void => {
  stopSound(appId);
  
  // Play immediately
  playSound(soundFile, volume);
  
  // Set up interval for repeated playback
  activeSounds[appId] = setInterval(() => {
    playSound(soundFile, volume);
  }, interval);
  
  // Send status update to client
  DeskThing.send({
    type: 'sound_status',
    payload: { appId, playing: true }
  });
};

// Start listener - runs when the app starts
DeskThing.on('start', async () => {
  console.log('=== BUSYTHING SERVER STARTING ===');
  
  try {
    const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
    const soundsPath = path.join(appData, "deskthing", "apps", "busything", "sounds");
    console.log(`[BusyThing] Sounds directory: ${soundsPath}`);
    console.log('=== BUSYTHING SERVER STARTED SUCCESSFULLY ===');
  } catch (error) {
    console.error('[BusyThing] Error during startup:', error);
    throw error;
  }
});

// Handle stop event
DeskThing.on('stop', async () => {
  console.log('=== BUSYTHING SERVER STOPPING ===');
  stopAllSounds();
  console.log('=== BUSYTHING SERVER STOPPED ===');
});

// Listen for requests from the client
DeskThing.on('data', (data) => {
  console.log('[BusyThing] Received data from client:', data);
  
  if (!data.payload || typeof data.payload !== 'object') {
    console.warn('Invalid payload received');
    return;
  }

  const payload = data.payload as {
    request?: string;
    appId?: string;
    soundFile?: string;
    interval?: number;
    volume?: number;
  };
  
  const request = payload.request;
  
  if (!request) {
    console.warn('[BusyThing] No request specified in payload');
    return;
  }
  
  switch (request) {
    case 'play_sound':
      console.log('[BusyThing] Client requesting sound playback');
      if (payload.appId && payload.soundFile && payload.interval !== undefined && payload.volume !== undefined) {
        startSound(payload.appId, payload.soundFile, payload.interval, payload.volume);
      } else {
        console.warn('Missing required parameters for play_sound');
      }
      break;
      
    case 'stop_sound':
      console.log('[BusyThing] Client requesting sound stop');
      if (payload.appId) {
        stopSound(payload.appId);
      } else {
        console.warn('Missing appId for stop_sound');
      }
      break;
      
    case 'stop_all':
      console.log('[BusyThing] Client requesting stop all sounds');
      stopAllSounds();
      break;
      
    case 'test_sound':
      console.log('[BusyThing] Client requesting test sound');
      if (payload.soundFile) {
        playSound(payload.soundFile, payload.volume || 0.7);
      } else {
        console.warn('Missing soundFile for test_sound');
      }
      break;
      
    default:
      console.warn('[BusyThing] Unknown request:', request);
  }
});