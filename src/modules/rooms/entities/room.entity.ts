import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, OneToMany, UpdateDateColumn } from 'typeorm';

import { User } from 'src/modules/users/entities/user.entity';
import { Message } from './message.entity';

@Entity()
export class Room {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  description: string;

  @Column({ name: 'ticket_id' })
  ticketId: string;

  @Column()
  permalink: string;

  @Column(type => User)
  users: User[];

  @Column(type => Message)
  messages: Message[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
