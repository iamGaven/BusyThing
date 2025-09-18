# BusyThing

A DeskThing app that simulates app notification sounds to help you feign importance! Inspired by [Busy Simulator](https://busysimulator.com/).

Vibe coded with Cursor based on Riprod's DeskThing app template.

## Features

- **Panel System**: Left panel for controls, right panel for settings
- **10 App Sounds**: Google Calendar, Slack, Teams, Google Chat, Discord, Apple Mail, Outlook, iMessage, Skype, and Phone
- **Category Filtering**: Organize apps by Communication, Productivity, Social, and Entertainment
- **Individual Controls**: Set custom intervals and volumes for each app
- **Global Volume**: Master volume control for all sounds
- **Mobile Optimized**: Designed for DeskThing's 4-inch 800x480 display

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Development mode:
   ```bash
   npm run dev
   ```

3. Build for DeskThing:
   ```bash
   npm run build
   ```

## Usage

1. **Select Apps**: Check the apps you want to activate in the left panel
2. **Start/Stop**: Use the Start All/Stop All buttons to control playback
3. **Settings**: Toggle app settings to customize intervals and volumes
4. **Categories**: Filter apps by category using the top filter buttons
5. **Volume**: Adjust global volume or individual app volumes

## App Categories

- **Communication**: Slack, Teams, Google Chat, iMessage, Skype, Phone
- **Productivity**: Google Calendar, Apple Mail, Outlook
- **Social**: Discord

## Technical Details

- Built with React + TypeScript
- Uses DeskThing CLI for development and packaging
- Tailwind CSS for responsive design
- HTML5 Audio API for sound playback
- Optimized for 800x480 resolution

## Credits

- Original concept by Brian Moore ([Busy Simulator](https://busysimulator.com/))
- DeskThing implementation by milest0ne
- App icons and sounds included in the public folder

## License

This project is open source. See LICENSE file for details.
