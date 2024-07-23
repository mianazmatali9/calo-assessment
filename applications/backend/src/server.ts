import { startServer } from './app';

startServer().catch((error) => console.error('Admin: Server failed to start!', error));
