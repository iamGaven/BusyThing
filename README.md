# BusyThing

A DeskThing app that simulates app notification sounds to help you feign importance! Inspired by [Busy Simulator](https://busysimulator.com/).

Vibe coded with Cursor based on Riprod's DeskThing app template.

![busyThing1](https://github.com/user-attachments/assets/3f28d5a8-ebe6-4c07-992b-0e3ee71cf55c)

## Features

- **Panel System**: Left panel for controls, right panel for settings
- **10 App Sounds**: Google Calendar, Slack, Teams, Google Chat, Discord, Apple Mail, Outlook, iMessage, Skype, and Phone
- **Category Filtering**: Organize apps by Communication, Productivity, Social, and Entertainment
- **Individual Controls**: Set custom intervals and volumes for each app
- **Global Volume**: Master volume control for all sounds
- **Mobile Optimized**: Designed for DeskThing's 4-inch 800x480 display

## Prerequisites

### ⚠️ Important: PowerShell System Variable Required

This app requires PowerShell to be in your system PATH variable for the App to work properly.

#### Windows - Adding PowerShell to PATH:

1. **Open System Properties**:
   - Press `Win + R`, type `sysdm.cpl`, and press Enter
   - Or: Right-click "This PC" → Properties → Advanced system settings

2. **Access Environment Variables**:
   - Click "Environment Variables" button at the bottom

3. **Edit PATH Variable**:
   - Under "System variables" (bottom section), find and select "Path"
   - Click "Edit"

4. **Add PowerShell**:
   - Click "New"
   - Add one of these paths (depending on your PowerShell version):
     - PowerShell 5.x: `C:\Windows\System32\WindowsPowerShell\v1.0`
     - PowerShell 7.x: `C:\Program Files\PowerShell\7`
   
5. **Apply Changes**:
   - Click OK on all windows
   - **Restart your terminal/command prompt** for changes to take effect

6. **Verify Installation**:
   ```bash
   powershell -v
   ```
   You should see the PowerShell version number.

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
3. **Settings**: Adjust settings in the right panel to customize intervals and volumes
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