import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  name: process.env.DATABASE_NAME || 'trilogo',
  port: process.env.DATABASE_PORT || 27017,
}));
