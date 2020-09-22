import { Controller, Post, HttpStatus, HttpCode, Get, Request, Response, Body, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.sign(loginDto);
  }

  @Post('/refresh-token')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Refresh token' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<any> {
    return await this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
