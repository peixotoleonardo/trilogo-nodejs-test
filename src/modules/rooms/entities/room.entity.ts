import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';

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
}
