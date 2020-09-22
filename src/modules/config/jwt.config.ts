import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'trilogo',
  expiresIn: process.env.EXPIRES_IN || '30d',
}));
