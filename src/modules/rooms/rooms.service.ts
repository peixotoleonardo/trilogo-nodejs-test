import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { CreateRoomDto } from './dtos/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Room>> {
    return paginate<Room>(this.repository, options);
  }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.repository.save(
      this.repository.create(createRoomDto
    ));
  }

  async addMessage(message: Message, id: string) {
    // const room = await this.repository.findOne(id);

    // return await room.save();
  }

  async findMessages(id: string, limit: number) {
    let room = await this.findWithLimit(id, limit);

    // // Create the user room, if isn't already exist
    // if (!room) {
    //   const userRoom = new this.roomModel({ _id: id, name: id, is_user: true });
    //   room = await this.create(userRoom);
    // }

    // return room.messages;
  }

  async findAll(options?: any): Promise<Room[]> {
    return this.repository.find(options);
  }

  async findWithLimit(id: string, limit: number): Promise<Room> {
    return this.repository.findOne(id);
  }

  async findById(id: string): Promise<Room> {
    return this.repository.findOne(id);
  }

  async findOne(options?: any): Promise<Room> {
    return this.repository.findOne(options);
  }

  async update(id: string, newValue: Room): Promise<UpdateResult> {
    return await this.repository.update(id, newValue);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
