import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  ValidationPipe,
  UsePipes,
  Param,
  NotFoundException, Query, UseGuards
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindOneParamsDto } from '../common/dto/find-one-param.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const ResourseName = 'users';

@ApiBearerAuth()
@ApiTags(ResourseName)
@Controller(ResourseName)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all users' })
  async index( 
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ): Promise<Pagination<User>> {
    return await this.usersService.paginate({
      page,
      limit,
      route: ResourseName
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Show a specific user' })
  async show(@Param() findOneParamDto: FindOneParamsDto): Promise<User> {
    const user = await this.usersService.findById(findOneParamDto.id);

    if (!user) {
      throw new NotFoundException(`The user with the id: ${findOneParamDto.id} does not exists`);
    }

    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a user' })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update a user' })
  async update(@Param() findOneParamsDto: FindOneParamsDto, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(findOneParamsDto.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Delete a user' })
  public async delete(@Param() findOneParamsDto: FindOneParamsDto) {
    await this.usersService.delete(findOneParamsDto.id);
  }
}
