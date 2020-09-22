import { Message } from 'src/modules/rooms/entities/message.entity';
import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(type => Message, message => message.user)
  messages: Message[];
}