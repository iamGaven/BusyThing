import { DeskThing } from '@deskthing/server';
import { setupSettings } from './setupSettings';

// Initialize settings
setupSettings();

// Simple server setup
DeskThing.on('start', () => {
  console.log('BusyThing server started');
});

DeskThing.on('stop', () => {
  console.log('BusyThing server stopped');
});

// Export for DeskThing
export default DeskThing;