import React from 'react';

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

interface ControlsPanelProps {
  onClose: () => void;
  apps: AppConfig[];
  filteredApps: AppConfig[];
  isRunning: boolean;
  onToggleApp: (appId: string) => void;
  onStartAll: () => void;
  onStopAll: () => void;
  onTestAudio: (appId: string) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  onClose,
  apps,
  filteredApps,
  isRunning,
  onToggleApp,
  onStartAll,
  onStopAll,
  onTestAudio
}) => {
  return (
    <div className="panel-container fixed left-0 top-0 h-full w-full sm:w-96 bg-gray-900 text-white shadow-lg z-50">
      <div className="panel-content p-3 sm:p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-900 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold">Controls</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Start/Stop Controls */}
        <div className="space-y-3 mb-6">
          <button
            onClick={onStartAll}
            disabled={isRunning || !apps.some(app => app.active)}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-lg">🚀</span>
            Start All
          </button>
          <button
            onClick={onStopAll}
            disabled={!isRunning}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-lg">⏹️</span>
            Stop All
          </button>
          <button
            onClick={() => onTestAudio('phone')}
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
                onChange={() => onToggleApp(app.id)}
                className="w-4 h-4 accent-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel;
