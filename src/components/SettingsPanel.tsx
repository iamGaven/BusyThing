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

interface SettingsPanelProps {
  onClose: () => void;
  filteredApps: AppConfig[];
  globalVolume: number;
  backgroundColor: string;
  onGlobalVolumeChange: (volume: number) => void;
  onBackgroundColorChange: (color: string) => void;
  onAppIntervalChange: (appId: string, interval: number) => void;
  onAppVolumeChange: (appId: string, volume: number) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  filteredApps,
  globalVolume,
  backgroundColor,
  onGlobalVolumeChange,
  onBackgroundColorChange,
  onAppIntervalChange,
  onAppVolumeChange
}) => {
  return (
    <div className="panel-container fixed right-0 top-0 h-full w-full sm:w-96 bg-gray-900 text-white shadow-lg z-50">
      <div className="panel-content p-3 sm:p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-900 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
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
              onChange={(e) => onGlobalVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-blue-500"
            />
            <span className="text-xs opacity-75">{Math.round(globalVolume * 100)}%</span>
          </div>
          <div>
            <label className="text-xs block mb-2">Background Color</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="w-12 h-8 rounded border border-gray-600 cursor-pointer"
              />
              <span className="text-xs opacity-75">{backgroundColor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onBackgroundColorChange('#7c3aed')}
                className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: '#7c3aed' }}
                title="Purple"
              />
              <button
                onClick={() => onBackgroundColorChange('#2563eb')}
                className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: '#2563eb' }}
                title="Blue"
              />
              <button
                onClick={() => onBackgroundColorChange('#dc2626')}
                className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: '#dc2626' }}
                title="Red"
              />
              <button
                onClick={() => onBackgroundColorChange('#059669')}
                className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: '#059669' }}
                title="Green"
              />
              <button
                onClick={() => onBackgroundColorChange('#ea580c')}
                className="w-6 h-6 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: '#ea580c' }}
                title="Orange"
              />
              <button
                onClick={() => onBackgroundColorChange('#7c2d12')}
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
                    onChange={(e) => onAppIntervalChange(app.id, parseInt(e.target.value))}
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
                    onChange={(e) => onAppVolumeChange(app.id, parseFloat(e.target.value))}
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
  );
};

export default SettingsPanel;
