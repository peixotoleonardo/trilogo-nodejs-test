import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';

import databaseConfig from 'src/modules/config/database.config';
import appConfig from 'src/modules/config/app.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('database.host'),
        port: +configService.get<number>('database.port'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        useUnifiedTopology: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ChatModule,
    RoomsModule,
  ],
})
export class AppModule {}
