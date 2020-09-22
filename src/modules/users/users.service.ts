import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  
  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.repository, options);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  async findAll(options?: any): Promise<User[]> {
    return this.repository.find(options);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  async findOne(options: any): Promise<User> {
    return this.repository.findOne(options);
  }

  async update(id: string, updateUserDtpo: UpdateUserDto): Promise<UpdateResult> {
    return this.repository.update(id, updateUserDtpo);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
