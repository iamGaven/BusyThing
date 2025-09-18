import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DEVICE_CLIENT } from '@deskthing/types';

interface AppConfig {
  id: string;
  name: string;
  icon: string;
  sound: string;
  category: 'communication' | 'productivity' | 'social';
  active: boolean;
  interval: number;
  volume: number;
}

type CategoryType = 'all' | 'communication' | 'productivity' | 'social';

// Asset URLs - defined outside component to prevent recreation on each render
const ASSET_URLS = {
  icons: {
    'google-cal': new URL('/icons/google-cal.png', import.meta.url).href,
    'slack': new URL('/icons/slack.png', import.meta.url).href,
    'teams': new URL('/icons/teams.png', import.meta.url).href,
    'gchat': new URL('/icons/gchat.png', import.meta.url).href,
    'discord': new URL('/icons/discord.png', import.meta.url).href,
    'apple-mail': new URL('/icons/apple-mail.png', import.meta.url).href,
    'outlook': new URL('/icons/outlook.png', import.meta.url).href,
    'imessage': new URL('/icons/imessage.png', import.meta.url).href,
    'skype': new URL('/icons/skype.png', import.meta.url).href,
    'phone': new URL('/icons/phone.png', import.meta.url).href,
  },
  sounds: {
    'google-cal': new URL('/sounds/RE.mp3', import.meta.url).href,
    'slack': new URL('/sounds/slack.mp3', import.meta.url).href,
    'teams': new URL('/sounds/teams.mp3', import.meta.url).href,
    'gchat': new URL('/sounds/gchat.mp3', import.meta.url).href,
    'discord': new URL('/sounds/discord.mp3', import.meta.url).href,
    'apple-mail': new URL('/sounds/applemail.mp3', import.meta.url).href,
    'outlook': new URL('/sounds/outlook.mp3', import.meta.url).href,
    'imessage': new URL('/sounds/imessage.mp3', import.meta.url).href,
    'skype': new URL('/sounds/skype.mp3', import.meta.url).href,
    'phone': new URL('/sounds/phone.mp3', import.meta.url).href,
  }
};

const App: React.FC = () => {
  const [apps, setApps] = useState<AppConfig[]>([
    { id: 'google-cal', name: 'Google Calendar', icon: ASSET_URLS.icons['google-cal'], sound: ASSET_URLS.sounds['google-cal'], category: 'productivity', active: false, interval: 5000, volume: 0.7 },
    { id: 'slack', name: 'Slack', icon: ASSET_URLS.icons['slack'], sound: ASSET_URLS.sounds['slack'], category: 'communication', active: false, interval: 4000, volume: 0.7 },
    { id: 'teams', name: 'Microsoft Teams', icon: ASSET_URLS.icons['teams'], sound: ASSET_URLS.sounds['teams'], category: 'communication', active: false, interval: 3500, volume: 0.7 },
    { id: 'gchat', name: 'Google Chat', icon: ASSET_URLS.icons['gchat'], sound: ASSET_URLS.sounds['gchat'], category: 'communication', active: false, interval: 4500, volume: 0.7 },
    { id: 'discord', name: 'Discord', icon: ASSET_URLS.icons['discord'], sound: ASSET_URLS.sounds['discord'], category: 'social', active: false, interval: 3000, volume: 0.7 },
    { id: 'apple-mail', name: 'Apple Mail', icon: ASSET_URLS.icons['apple-mail'], sound: ASSET_URLS.sounds['apple-mail'], category: 'productivity', active: false, interval: 6000, volume: 0.7 },
    { id: 'outlook', name: 'Outlook', icon: ASSET_URLS.icons['outlook'], sound: ASSET_URLS.sounds['outlook'], category: 'productivity', active: false, interval: 5500, volume: 0.7 },
    { id: 'imessage', name: 'iMessage', icon: ASSET_URLS.icons['imessage'], sound: ASSET_URLS.sounds['imessage'], category: 'communication', active: false, interval: 2500, volume: 0.7 },
    { id: 'skype', name: 'Skype', icon: ASSET_URLS.icons['skype'], sound: ASSET_URLS.sounds['skype'], category: 'communication', active: false, interval: 4000, volume: 0.7 },
    { id: 'phone', name: 'Vibrating Phone', icon: ASSET_URLS.icons['phone'], sound: ASSET_URLS.sounds['phone'], category: 'communication', active: false, interval: 2000, volume: 0.7 },
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [globalVolume, setGlobalVolume] = useState(0.7);
  const [backgroundColor, setBackgroundColor] = useState('#7c3aed'); // Default purple
  const [isRunning, setIsRunning] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [visualFeedback, setVisualFeedback] = useState(true);
  const [defaultInterval, setDefaultInterval] = useState(4000);
  const [defaultAppVolume, setDefaultAppVolume] = useState(0.7);
  
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(() => [
    { id: 'all' as const, name: 'All Apps', count: apps.length },
    { id: 'communication' as const, name: 'Communication', count: apps.filter(app => app.category === 'communication').length },
    { id: 'productivity' as const, name: 'Productivity', count: apps.filter(app => app.category === 'productivity').length },
    { id: 'social' as const, name: 'Social', count: apps.filter(app => app.category === 'social').length }
  ], [apps]);

  const filteredApps = selectedCategory === 'all' 
    ? apps 
    : apps.filter(app => app.category === selectedCategory);

  // Initialize audio elements - only run once on mount
  useEffect(() => {
    apps.forEach(app => {
      const audio = new Audio(app.sound);
      audio.volume = app.volume * globalVolume;
      audio.preload = 'auto'; // Preload audio
      audioRefs.current[app.id] = audio;
    });

    return () => {
      // Cleanup audio elements
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    // Update all audio volumes when global volume changes
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = globalVolume;
    });
  }, [globalVolume]);

  // Update individual app volumes when they change
  useEffect(() => {
    apps.forEach(app => {
      const audio = audioRefs.current[app.id];
      if (audio) {
        audio.volume = app.volume * globalVolume;
      }
    });
  }, [apps, globalVolume]);

  // Robust settings handling (like ActionThing)
  useEffect(() => {
    // Load settings from localStorage on startup
    try {
      const savedSettings = localStorage.getItem('busything-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        console.log('[BusyThing] Loading settings from localStorage:', settings);
        
        if (settings.backgroundColor) setBackgroundColor(settings.backgroundColor);
        if (settings.globalVolume !== undefined) setGlobalVolume(settings.globalVolume);
        if (settings.soundEnabled !== undefined) setSoundEnabled(settings.soundEnabled);
        if (settings.visualFeedback !== undefined) setVisualFeedback(settings.visualFeedback);
        if (settings.defaultInterval !== undefined) setDefaultInterval(settings.defaultInterval);
        if (settings.defaultAppVolume !== undefined) setDefaultAppVolume(settings.defaultAppVolume);
      }
    } catch (error) {
      console.warn('[BusyThing] Failed to load settings from localStorage:', error);
    }

    // Get initial settings from DeskThing
    if (typeof window !== 'undefined' && (window as any).DeskThing) {
      (window as any).DeskThing.getSettings().then((settingsData: any) => {
        if (settingsData) {
          console.log('[BusyThing] Received initial settings from DeskThing:', settingsData);
          applySettingsToState(settingsData);
        }
      }).catch((error: any) => {
        console.warn('[BusyThing] Failed to get initial settings from DeskThing:', error);
      });
    }

    // Listen for settings updates from DeskThing
    const handleSettingsUpdate = (settings: any) => {
      console.log('[BusyThing] Received settings update:', settings);
      
      // Handle different possible data structures from DeskThing (like ActionThing)
      let settingsData = settings;
      if (settings && typeof settings === 'object') {
        if (settings.payload) {
          settingsData = settings.payload;
        } else if (settings.settings) {
          settingsData = settings.settings;
        }
      }
      
      if (settingsData && typeof settingsData === 'object') {
        applySettingsToState(settingsData);
      } else {
        console.warn('[BusyThing] Invalid settings data received:', settingsData);
      }
    };

    // Apply settings to state (centralized function)
    const applySettingsToState = (settingsData: any) => {
      console.log('[BusyThing] Applying settings to state:', settingsData);

      // Update global settings
      if (settingsData.backgroundColor !== undefined) {
        setBackgroundColor(settingsData.backgroundColor);
        console.log('[BusyThing] Updated backgroundColor to:', settingsData.backgroundColor);
      }
      if (settingsData.globalVolume !== undefined) {
        setGlobalVolume(settingsData.globalVolume);
        console.log('[BusyThing] Updated globalVolume to:', settingsData.globalVolume);
      }
      if (settingsData.soundEnabled !== undefined) {
        setSoundEnabled(settingsData.soundEnabled);
        console.log('[BusyThing] Updated soundEnabled to:', settingsData.soundEnabled);
      }
      if (settingsData.visualFeedback !== undefined) {
        setVisualFeedback(settingsData.visualFeedback);
        console.log('[BusyThing] Updated visualFeedback to:', settingsData.visualFeedback);
      }
      if (settingsData.defaultInterval !== undefined) {
        setDefaultInterval(settingsData.defaultInterval);
        console.log('[BusyThing] Updated defaultInterval to:', settingsData.defaultInterval);
      }
      if (settingsData.defaultAppVolume !== undefined) {
        setDefaultAppVolume(settingsData.defaultAppVolume);
        console.log('[BusyThing] Updated defaultAppVolume to:', settingsData.defaultAppVolume);
      }

      // Update individual app settings
      setApps(prev => prev.map(app => {
        const appId = app.id.replace('-', ''); // Convert 'google-cal' to 'googlecal'
        const intervalKey = `${appId}Interval`;
        const volumeKey = `${appId}Volume`;
        
        let newApp = { ...app };
        
        if (settingsData[intervalKey] !== undefined) {
          newApp.interval = settingsData[intervalKey];
          console.log(`[BusyThing] Updated ${app.name} interval to:`, settingsData[intervalKey]);
        }
        if (settingsData[volumeKey] !== undefined) {
          newApp.volume = settingsData[volumeKey];
          console.log(`[BusyThing] Updated ${app.name} volume to:`, settingsData[volumeKey]);
        }
        
        return newApp;
      }));

      // Save to localStorage as backup
      try {
        const currentSettings = {
          backgroundColor: settingsData.backgroundColor || backgroundColor,
          globalVolume: settingsData.globalVolume !== undefined ? settingsData.globalVolume : globalVolume,
          soundEnabled: settingsData.soundEnabled !== undefined ? settingsData.soundEnabled : soundEnabled,
          visualFeedback: settingsData.visualFeedback !== undefined ? settingsData.visualFeedback : visualFeedback,
          defaultInterval: settingsData.defaultInterval !== undefined ? settingsData.defaultInterval : defaultInterval,
          defaultAppVolume: settingsData.defaultAppVolume !== undefined ? settingsData.defaultAppVolume : defaultAppVolume
        };
        localStorage.setItem('busything-settings', JSON.stringify(currentSettings));
      } catch (error) {
        console.error('[BusyThing] Error saving settings to localStorage:', error);
      }
    };

    // Listen for DeskThing settings events using DEVICE_CLIENT.SETTINGS
    let settingsListener: (() => void) | undefined;
    if (typeof window !== 'undefined' && (window as any).DeskThing) {
      if ((window as any).DeskThing.on) {
        settingsListener = (window as any).DeskThing.on(DEVICE_CLIENT.SETTINGS, handleSettingsUpdate);
      }
    }

    return () => {
      if (settingsListener) {
        settingsListener();
      }
    };
  }, []);

  // Handle setting changes with persistence (like FlowThing)
  const handleSettingChange = (key: string, value: any) => {
    try {
      console.log(`[BusyThing] Setting changed: ${key} = ${value}`);
      
      // Update local state immediately
      if (key === 'backgroundColor') {
        setBackgroundColor(value);
      } else if (key === 'globalVolume') {
        setGlobalVolume(value);
      } else if (key === 'soundEnabled') {
        setSoundEnabled(value);
      } else if (key === 'visualFeedback') {
        setVisualFeedback(value);
      } else if (key === 'defaultInterval') {
        setDefaultInterval(value);
      } else if (key === 'defaultAppVolume') {
        setDefaultAppVolume(value);
      }
      
      // Save to localStorage immediately
      try {
        const currentSettings = JSON.parse(localStorage.getItem('busything-settings') || '{}');
        const newSettings = { ...currentSettings, [key]: value };
        localStorage.setItem('busything-settings', JSON.stringify(newSettings));
        console.log('[BusyThing] Setting saved to localStorage:', key, value);
      } catch (error) {
        console.warn('[BusyThing] Failed to save settings to localStorage:', error);
      }
      
      // Send to DeskThing if available
      if (typeof window !== 'undefined' && (window as any).DeskThing && (window as any).DeskThing.setSetting) {
        try {
          (window as any).DeskThing.setSetting(key, value);
        } catch (error) {
          console.warn('[BusyThing] Failed to send setting to DeskThing:', error);
        }
      }
    } catch (error) {
      console.error('[BusyThing] Error in handleSettingChange:', error);
    }
  };

  // Apply default settings to apps when they are first created or when defaults change
  // This ensures new apps get the current default values
  const applyDefaultsToApps = () => {
    setApps(prev => prev.map(app => ({
      ...app,
      interval: defaultInterval,
      volume: defaultAppVolume
    })));
  };

  const toggleApp = (appId: string) => {
    setApps(prev => prev.map(app => {
      if (app.id === appId) {
        const newActive = !app.active;
        // If activating the app, start it immediately with forceActive
        if (newActive) {
          startApp(appId, true); // Force start even before state update
        } else {
          // If deactivating the app, stop it
          stopApp(appId);
        }
        return { ...app, active: newActive };
      }
      return app;
    }));
  };

  const startAll = () => {
    setIsRunning(true);
    apps.forEach(app => {
      if (app.active) {
        startApp(app.id);
      }
    });
    console.log('Started all active apps');
  };

  const stopAll = () => {
    setIsRunning(false);
    Object.values(intervalRefs.current).forEach(interval => {
      clearInterval(interval);
    });
    intervalRefs.current = {};
    console.log('Stopped all apps');
  };

  const startApp = (appId: string, forceActive = false) => {
    const app = apps.find(a => a.id === appId);
    if (!app || (!app.active && !forceActive)) return;

    // Don't start if sounds are disabled globally
    if (!soundEnabled) return;

    const audio = audioRefs.current[appId];
    if (!audio) return;

    // Clear existing interval
    if (intervalRefs.current[appId]) {
      clearInterval(intervalRefs.current[appId]);
    }

    // Start new interval
    intervalRefs.current[appId] = setInterval(() => {
      // Check if sounds are still enabled
      if (!soundEnabled) return;
      
      // Ensure audio is loaded
      if (audio.readyState === 0) {
        audio.load();
      }
      audio.currentTime = 0;
      audio.play().then(() => {
        console.log(`Playing ${app.name} audio`);
      }).catch(err => {
        console.error(`Failed to play ${app.name}:`, err);
      });
    }, app.interval);
  };

  const stopApp = (appId: string) => {
    if (intervalRefs.current[appId]) {
      clearInterval(intervalRefs.current[appId]);
      delete intervalRefs.current[appId];
    }
  };

  const updateAppInterval = (appId: string, interval: number) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, interval } : app
    ));
    
    // Restart app if it's currently running
    if (intervalRefs.current[appId]) {
      stopApp(appId);
      startApp(appId);
    }
  };

  const updateAppVolume = (appId: string, volume: number) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, volume } : app
    ));
    
    const audio = audioRefs.current[appId];
    if (audio) {
      audio.volume = volume * globalVolume;
    }
  };

  // Test audio function to help debug autoplay issues
  const testAudio = (appId: string) => {
    const audio = audioRefs.current[appId];
    if (audio) {
      // Initialize audio context on first user interaction
      if (audio.readyState === 0) {
        audio.load();
      }
      audio.currentTime = 0;
      audio.play().then(() => {
        console.log(`Audio test successful for ${appId}`);
      }).catch(err => {
        console.error(`Audio test failed for ${appId}:`, err);
      });
    }
  };

// Global click handler for panel toggles and click-outside-to-close
useEffect(() => {
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    console.log('BusyThing: Global click detected on:', target.tagName, target.className, target);
    
    // If clicking inside a panel, don't close it
    if (target.closest('.panel-container')) {
      console.log('BusyThing: Click inside panel, not closing');
      return;
    }
    
    // If clicking on interactive elements, don't toggle panels
    if (target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('select') ||
        target.closest('[class*="grid"]') || // Don't trigger on grid content
        target.closest('[class*="bg-white/10"]')) { // Don't trigger on app tiles
      console.log('BusyThing: Click on interactive element detected, not toggling panel');
      return;
    }
    
    const clientX = event.clientX;
    const screenWidth = window.innerWidth;
    const edgeThreshold = 20; // Only trigger within 20px of screen edges
    
    const isLeftEdge = clientX < edgeThreshold;
    const isRightEdge = clientX > screenWidth - edgeThreshold;
    
    // If panels are open and clicking outside, close them
    if (showLeftPanel || showRightPanel) {
      console.log('BusyThing: Click outside panels, closing them');
      setShowLeftPanel(false);
      setShowRightPanel(false);
      return;
    }
    
    // If panels are closed and clicking on edges, open them
    if (isRightEdge) {
      console.log('BusyThing: Right edge click detected, opening right panel');
      setShowRightPanel(true);
    } else if (isLeftEdge) {
      console.log('BusyThing: Left edge click detected, opening left panel');
      setShowLeftPanel(true);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowLeftPanel(false);
      setShowRightPanel(false);
    }
  };

  window.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    window.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [showLeftPanel, showRightPanel]);














  return (
    <div className="w-screen h-screen relative overflow-y-auto" style={{ backgroundColor }}>
      {/* Main Content - App Cards Grid */}
      <div className="w-full h-full relative">
        {/* Header */}
        <div className="text-center py-4 px-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 text-white">BusyThing</h1>
          <p className="text-xs sm:text-sm opacity-90 text-white px-2">Feign importance with repeating app sounds!</p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 sm:gap-3 px-2 sm:px-4 mb-4 sm:mb-6 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors min-h-[40px] sm:min-h-[44px] min-w-[40px] sm:min-w-[44px] flex items-center justify-center ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* App Cards Grid */}
        <div className="flex justify-center px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-7xl w-full">
            {filteredApps.map(app => (
              <div 
                key={app.id} 
                className={`bg-white/10 rounded-lg p-3 backdrop-blur-sm min-h-[120px] flex flex-col cursor-pointer transition-all duration-200 hover:bg-white/20 ${
                  app.active && visualFeedback ? 'ring-2 ring-blue-400 bg-blue-500/20' : ''
                }`}
                onClick={() => toggleApp(app.id)}
              >
                <div className="flex flex-col items-center space-y-2 flex-1">
                  <img src={app.icon} alt={app.name} className="w-12 h-12 sm:w-10 sm:h-10" />
                  <span className="text-xs font-medium text-center text-white leading-tight">{app.name}</span>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className={`w-3 h-3 rounded-full ${app.active ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                    <span className="text-xs text-white">{app.active ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm px-2 py-1">
          <div className="text-center text-xs opacity-75 text-white">
            {isRunning ? (
              <span className="text-green-400">● Running {apps.filter(app => app.active).length} apps</span>
            ) : (
              <span className="text-gray-400">○ Stopped</span>
            )}
          </div>
        </div>
      </div>

      {/* Panel Toggle Areas - Simple mobile-style dots */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side dot indicator */}
        <div className="absolute left-0 top-0 w-4 h-full pointer-events-none">
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-30 hover:opacity-60 transition-opacity">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Right side dot indicator */}
        <div className="absolute right-0 top-0 w-4 h-full pointer-events-none">
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-30 hover:opacity-60 transition-opacity">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Left Panel - Controls */}
      <div className={`${showLeftPanel ? 'panel' : ''} left-panel`}>
        <div className={`panel-container fixed left-0 top-0 h-full w-full sm:w-96 bg-gray-900 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          showLeftPanel ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="panel-content p-3 sm:p-6 h-full overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-900 pb-2">
              <h2 className="text-xl sm:text-2xl font-bold">Controls</h2>
            </div>

            {/* Start/Stop Controls */}
            <div className="space-y-3 mb-6">
              <button
                onClick={startAll}
                disabled={isRunning || !apps.some(app => app.active)}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">🚀</span>
                Start All
              </button>
              <button
                onClick={stopAll}
                disabled={!isRunning}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">⏹️</span>
                Stop All
              </button>
              <button
                onClick={() => testAudio('phone')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">🔊</span>
                Test Audio (Phone)
              </button>
            </div>

            {/* App Selection */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">App Selection</h3>
              {filteredApps.map(app => (
                <div key={app.id} className="flex items-center gap-2 p-2 bg-gray-800 rounded-md">
                  <img src={app.icon} alt={app.name} className="w-6 h-6" />
                  <span className="text-xs flex-1 truncate">{app.name}</span>
                  <input
                    type="checkbox"
                    checked={app.active}
                    onChange={() => toggleApp(app.id)}
                    className="w-4 h-4 accent-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Settings */}
      <div className={`${showRightPanel ? 'panel' : ''} right-panel`}>
        <div className={`panel-container fixed right-0 top-0 h-full w-full sm:w-96 bg-gray-900 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          showRightPanel ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="panel-content p-3 sm:p-6 h-full overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-900 pb-2">
              <h2 className="text-xl sm:text-2xl font-bold">Settings</h2>
            </div>

            {/* Global Settings */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-semibold">Global Settings</h3>
              <div>
                <label className="text-xs block mb-2">Master Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={globalVolume}
                  onChange={(e) => handleSettingChange('globalVolume', parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <span className="text-xs opacity-75">{Math.round(globalVolume * 100)}%</span>
              </div>
              <div>
                <label className="text-xs block mb-2">Default Sound Interval (ms)</label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={defaultInterval}
                  onChange={(e) => handleSettingChange('defaultInterval', parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <span className="text-xs opacity-75">{defaultInterval}ms</span>
              </div>
              <div>
                <label className="text-xs block mb-2">Default App Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={defaultAppVolume}
                  onChange={(e) => handleSettingChange('defaultAppVolume', parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <span className="text-xs opacity-75">{Math.round(defaultAppVolume * 100)}%</span>
              </div>
              <div>
                <label className="text-xs block mb-2">Background Color</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                    className="w-12 h-8 rounded border border-gray-600 cursor-pointer"
                  />
                  <span className="text-xs opacity-75">{backgroundColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSettingChange('backgroundColor', '#7c3aed')}
                    className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#7c3aed' }}
                    title="Purple"
                  />
                  <button
                    onClick={() => handleSettingChange('backgroundColor', '#2563eb')}
                    className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#2563eb' }}
                    title="Blue"
                  />
                  <button
                    onClick={() => handleSettingChange('backgroundColor', '#dc2626')}
                    className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#dc2626' }}
                    title="Red"
                  />
                  <button
                    onClick={() => handleSettingChange('backgroundColor', '#059669')}
                    className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#059669' }}
                    title="Green"
                  />
                  <button
                    onClick={() => handleSettingChange('backgroundColor', '#ea580c')}
                    className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#ea580c' }}
                    title="Orange"
                  />
                  <button
                    onClick={() => handleSettingChange('backgroundColor', '#7c2d12')}
                    className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#7c2d12' }}
                    title="Brown"
                  />
                </div>
              </div>
            </div>

            {/* App Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">App Settings</h3>
              {filteredApps.map(app => (
                <div key={app.id} className="p-3 bg-gray-800 rounded-md">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={app.icon} alt={app.name} className="w-6 h-6" />
                    <span className="text-xs font-medium">{app.name}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs block mb-1">Interval (ms)</label>
                      <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="500"
                        value={app.interval}
                        onChange={(e) => updateAppInterval(app.id, parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                      <span className="text-xs opacity-75">{app.interval}ms</span>
                    </div>
                    <div>
                      <label className="text-xs block mb-1">Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={app.volume}
                        onChange={(e) => updateAppVolume(app.id, parseFloat(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                      <span className="text-xs opacity-75">{Math.round(app.volume * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
