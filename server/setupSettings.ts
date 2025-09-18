import { DeskThing } from '@deskthing/server';
import { DESKTHING_EVENTS, SETTING_TYPES } from '@deskthing/types';

// Define setting IDs for BusyThing
export const BusyThingSettingIDs = {
  BACKGROUND_COLOR: 'backgroundColor',
  GLOBAL_VOLUME: 'globalVolume',
  DEFAULT_INTERVAL: 'defaultInterval',
  DEFAULT_APP_VOLUME: 'defaultAppVolume',
  AUTO_START: 'autoStart',
  SOUND_ENABLED: 'soundEnabled',
  VISUAL_FEEDBACK: 'visualFeedback',
  PANEL_ANIMATION_SPEED: 'panelAnimationSpeed',
  // Individual app settings
  GOOGLE_CAL_INTERVAL: 'googleCalInterval',
  GOOGLE_CAL_VOLUME: 'googleCalVolume',
  SLACK_INTERVAL: 'slackInterval',
  SLACK_VOLUME: 'slackVolume',
  TEAMS_INTERVAL: 'teamsInterval',
  TEAMS_VOLUME: 'teamsVolume',
  GCHAT_INTERVAL: 'gchatInterval',
  GCHAT_VOLUME: 'gchatVolume',
  DISCORD_INTERVAL: 'discordInterval',
  DISCORD_VOLUME: 'discordVolume',
  APPLE_MAIL_INTERVAL: 'appleMailInterval',
  APPLE_MAIL_VOLUME: 'appleMailVolume',
  OUTLOOK_INTERVAL: 'outlookInterval',
  OUTLOOK_VOLUME: 'outlookVolume',
  IMESSAGE_INTERVAL: 'imessageInterval',
  IMESSAGE_VOLUME: 'imessageVolume',
  SKYPE_INTERVAL: 'skypeInterval',
  SKYPE_VOLUME: 'skypeVolume',
  PHONE_INTERVAL: 'phoneInterval',
  PHONE_VOLUME: 'phoneVolume'
} as const;

// Define default settings
const defaultSettings = {
  [BusyThingSettingIDs.BACKGROUND_COLOR]: "#7c3aed",
  [BusyThingSettingIDs.GLOBAL_VOLUME]: 0.7,
  [BusyThingSettingIDs.DEFAULT_INTERVAL]: 4000,
  [BusyThingSettingIDs.DEFAULT_APP_VOLUME]: 0.7,
  [BusyThingSettingIDs.AUTO_START]: false,
  [BusyThingSettingIDs.SOUND_ENABLED]: true,
  [BusyThingSettingIDs.VISUAL_FEEDBACK]: true,
  [BusyThingSettingIDs.PANEL_ANIMATION_SPEED]: 300,
  // Individual app defaults
  [BusyThingSettingIDs.GOOGLE_CAL_INTERVAL]: 5000,
  [BusyThingSettingIDs.GOOGLE_CAL_VOLUME]: 0.7,
  [BusyThingSettingIDs.SLACK_INTERVAL]: 4000,
  [BusyThingSettingIDs.SLACK_VOLUME]: 0.7,
  [BusyThingSettingIDs.TEAMS_INTERVAL]: 3500,
  [BusyThingSettingIDs.TEAMS_VOLUME]: 0.7,
  [BusyThingSettingIDs.GCHAT_INTERVAL]: 4500,
  [BusyThingSettingIDs.GCHAT_VOLUME]: 0.7,
  [BusyThingSettingIDs.DISCORD_INTERVAL]: 3000,
  [BusyThingSettingIDs.DISCORD_VOLUME]: 0.7,
  [BusyThingSettingIDs.APPLE_MAIL_INTERVAL]: 6000,
  [BusyThingSettingIDs.APPLE_MAIL_VOLUME]: 0.7,
  [BusyThingSettingIDs.OUTLOOK_INTERVAL]: 5500,
  [BusyThingSettingIDs.OUTLOOK_VOLUME]: 0.7,
  [BusyThingSettingIDs.IMESSAGE_INTERVAL]: 2500,
  [BusyThingSettingIDs.IMESSAGE_VOLUME]: 0.7,
  [BusyThingSettingIDs.SKYPE_INTERVAL]: 4000,
  [BusyThingSettingIDs.SKYPE_VOLUME]: 0.7,
  [BusyThingSettingIDs.PHONE_INTERVAL]: 2000,
  [BusyThingSettingIDs.PHONE_VOLUME]: 0.7
};

export function setupSettings() {
  console.log('[BusyThing] Setting up settings configuration...');
  
  try {
    const deskThingSettings = {
      [BusyThingSettingIDs.BACKGROUND_COLOR]: {
        id: BusyThingSettingIDs.BACKGROUND_COLOR,
        type: SETTING_TYPES.COLOR,
        label: "🎨 Background Color",
        description: "Background color for the BusyThing interface",
        value: defaultSettings[BusyThingSettingIDs.BACKGROUND_COLOR]
      },
      [BusyThingSettingIDs.GLOBAL_VOLUME]: {
        id: BusyThingSettingIDs.GLOBAL_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "🔊 Master Volume",
        description: "Global volume control for all app sounds",
        value: defaultSettings[BusyThingSettingIDs.GLOBAL_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.DEFAULT_INTERVAL]: {
        id: BusyThingSettingIDs.DEFAULT_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "⏱️ Default Sound Interval",
        description: "Default interval (in milliseconds) for new app sounds",
        value: defaultSettings[BusyThingSettingIDs.DEFAULT_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.DEFAULT_APP_VOLUME]: {
        id: BusyThingSettingIDs.DEFAULT_APP_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "🎵 Default App Volume",
        description: "Default volume level for individual app sounds",
        value: defaultSettings[BusyThingSettingIDs.DEFAULT_APP_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.AUTO_START]: {
        id: BusyThingSettingIDs.AUTO_START,
        type: SETTING_TYPES.BOOLEAN,
        label: "🚀 Auto Start",
        description: "Automatically start playing sounds when apps are activated",
        value: defaultSettings[BusyThingSettingIDs.AUTO_START]
      },
      [BusyThingSettingIDs.SOUND_ENABLED]: {
        id: BusyThingSettingIDs.SOUND_ENABLED,
        type: SETTING_TYPES.BOOLEAN,
        label: "🔊 Enable Sounds",
        description: "Enable or disable all sound playback",
        value: defaultSettings[BusyThingSettingIDs.SOUND_ENABLED]
      },
      [BusyThingSettingIDs.VISUAL_FEEDBACK]: {
        id: BusyThingSettingIDs.VISUAL_FEEDBACK,
        type: SETTING_TYPES.BOOLEAN,
        label: "👁️ Visual Feedback",
        description: "Show visual feedback when apps are active (rings, highlights)",
        value: defaultSettings[BusyThingSettingIDs.VISUAL_FEEDBACK]
      },
      [BusyThingSettingIDs.PANEL_ANIMATION_SPEED]: {
        id: BusyThingSettingIDs.PANEL_ANIMATION_SPEED,
        type: SETTING_TYPES.RANGE,
        label: "⚡ Panel Animation Speed",
        description: "Speed of panel open/close animations (in milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.PANEL_ANIMATION_SPEED],
        min: 100,
        max: 1000,
        step: 50
      },
      // Individual App Settings
      [BusyThingSettingIDs.GOOGLE_CAL_INTERVAL]: {
        id: BusyThingSettingIDs.GOOGLE_CAL_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "📅 Google Calendar - Interval",
        description: "Sound interval for Google Calendar (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.GOOGLE_CAL_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.GOOGLE_CAL_VOLUME]: {
        id: BusyThingSettingIDs.GOOGLE_CAL_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "📅 Google Calendar - Volume",
        description: "Volume level for Google Calendar sounds",
        value: defaultSettings[BusyThingSettingIDs.GOOGLE_CAL_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.SLACK_INTERVAL]: {
        id: BusyThingSettingIDs.SLACK_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "💬 Slack - Interval",
        description: "Sound interval for Slack (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.SLACK_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.SLACK_VOLUME]: {
        id: BusyThingSettingIDs.SLACK_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "💬 Slack - Volume",
        description: "Volume level for Slack sounds",
        value: defaultSettings[BusyThingSettingIDs.SLACK_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.TEAMS_INTERVAL]: {
        id: BusyThingSettingIDs.TEAMS_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "👥 Teams - Interval",
        description: "Sound interval for Microsoft Teams (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.TEAMS_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.TEAMS_VOLUME]: {
        id: BusyThingSettingIDs.TEAMS_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "👥 Teams - Volume",
        description: "Volume level for Microsoft Teams sounds",
        value: defaultSettings[BusyThingSettingIDs.TEAMS_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.GCHAT_INTERVAL]: {
        id: BusyThingSettingIDs.GCHAT_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "💭 Google Chat - Interval",
        description: "Sound interval for Google Chat (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.GCHAT_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.GCHAT_VOLUME]: {
        id: BusyThingSettingIDs.GCHAT_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "💭 Google Chat - Volume",
        description: "Volume level for Google Chat sounds",
        value: defaultSettings[BusyThingSettingIDs.GCHAT_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.DISCORD_INTERVAL]: {
        id: BusyThingSettingIDs.DISCORD_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "🎮 Discord - Interval",
        description: "Sound interval for Discord (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.DISCORD_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.DISCORD_VOLUME]: {
        id: BusyThingSettingIDs.DISCORD_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "🎮 Discord - Volume",
        description: "Volume level for Discord sounds",
        value: defaultSettings[BusyThingSettingIDs.DISCORD_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.APPLE_MAIL_INTERVAL]: {
        id: BusyThingSettingIDs.APPLE_MAIL_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "📧 Apple Mail - Interval",
        description: "Sound interval for Apple Mail (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.APPLE_MAIL_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.APPLE_MAIL_VOLUME]: {
        id: BusyThingSettingIDs.APPLE_MAIL_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "📧 Apple Mail - Volume",
        description: "Volume level for Apple Mail sounds",
        value: defaultSettings[BusyThingSettingIDs.APPLE_MAIL_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.OUTLOOK_INTERVAL]: {
        id: BusyThingSettingIDs.OUTLOOK_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "📨 Outlook - Interval",
        description: "Sound interval for Outlook (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.OUTLOOK_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.OUTLOOK_VOLUME]: {
        id: BusyThingSettingIDs.OUTLOOK_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "📨 Outlook - Volume",
        description: "Volume level for Outlook sounds",
        value: defaultSettings[BusyThingSettingIDs.OUTLOOK_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.IMESSAGE_INTERVAL]: {
        id: BusyThingSettingIDs.IMESSAGE_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "💬 iMessage - Interval",
        description: "Sound interval for iMessage (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.IMESSAGE_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.IMESSAGE_VOLUME]: {
        id: BusyThingSettingIDs.IMESSAGE_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "💬 iMessage - Volume",
        description: "Volume level for iMessage sounds",
        value: defaultSettings[BusyThingSettingIDs.IMESSAGE_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.SKYPE_INTERVAL]: {
        id: BusyThingSettingIDs.SKYPE_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "📞 Skype - Interval",
        description: "Sound interval for Skype (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.SKYPE_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.SKYPE_VOLUME]: {
        id: BusyThingSettingIDs.SKYPE_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "📞 Skype - Volume",
        description: "Volume level for Skype sounds",
        value: defaultSettings[BusyThingSettingIDs.SKYPE_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      },
      [BusyThingSettingIDs.PHONE_INTERVAL]: {
        id: BusyThingSettingIDs.PHONE_INTERVAL,
        type: SETTING_TYPES.RANGE,
        label: "📱 Phone - Interval",
        description: "Sound interval for Phone (milliseconds)",
        value: defaultSettings[BusyThingSettingIDs.PHONE_INTERVAL],
        min: 1000,
        max: 10000,
        step: 500
      },
      [BusyThingSettingIDs.PHONE_VOLUME]: {
        id: BusyThingSettingIDs.PHONE_VOLUME,
        type: SETTING_TYPES.RANGE,
        label: "📱 Phone - Volume",
        description: "Volume level for Phone sounds",
        value: defaultSettings[BusyThingSettingIDs.PHONE_VOLUME],
        min: 0,
        max: 1,
        step: 0.1
      }
    };

    // Initialize settings with DeskThing
    const result = DeskThing.initSettings(deskThingSettings as any);
    console.log('[BusyThing] Settings initialized successfully:', result);
    console.log('[BusyThing] Available settings:', Object.keys(deskThingSettings));
    
    // Listen for settings changes from DeskThing
    DeskThing.on(DESKTHING_EVENTS.SETTINGS, async (settingData) => {
      const settings = settingData.payload;
      
      if (!settings) return;
      
      console.log('[BusyThing] Received settings update from DeskThing:', settings);
      
      // Process setting changes as needed
      Object.entries(settings).forEach(([key, setting]) => {
        console.log(`[BusyThing] Setting updated: ${key} = ${setting.value}`);
        // Add any server-side processing logic here if needed
      });
    });
    
    return {
      success: true,
      settings: deskThingSettings,
      defaultSettings
    };
  } catch (error) {
    console.error('[BusyThing] Error initializing settings:', error);
    throw error;
  }
}
