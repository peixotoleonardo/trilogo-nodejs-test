import { Schema } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(type => User, user => user.messages)
  user: User;

  read: boolean

  @CreateDateColumn({ name: 'created_at' })
  date: Date;
}