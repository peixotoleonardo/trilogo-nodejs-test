import {
  Controller,
  Get,
  Post,
  Body,
  Query, 
  ValidationPipe, 
  UsePipes, 
  Param, 
  NotFoundException, 
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindOneParamsDto } from '../common/dto/find-one-param.dto';
import { CreateRoomDto } from './dtos/create-room.dto';

import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';

const ResourseName = 'rooms';

@ApiBearerAuth()
@ApiTags(ResourseName)
@Controller(ResourseName)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all rooms' })
  async index(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<Room>> {
    return await this.roomsService.paginate({
      page,
      limit,
      route: ResourseName
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Show a specific room' })
  async show(@Param() { id }: FindOneParamsDto): Promise<Room> {
    const room = await this.roomsService.findById(id);

    if (!room) {
      throw new NotFoundException(`The room with the id: ${id} does not exists`);
    }

    return room;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a room' })
  async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }
}
