import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RoomsService } from '../rooms/rooms.service';

@WebSocketGateway({ namespace: 'rooms' })
export class ChatGateway {
  @WebSocketServer()
  server;

  connectedUsers: string[] = [];

  constructor(
    private roomService: RoomsService
  ) {}

  @SubscribeMessage('message')
  @UseGuards(JwtAuthGuard)
  async onMessage(socket, data: any) {
    const event: string = 'message';
    const result = data[0];

    await this.roomService.addMessage(result.message, result.room);
    socket.broadcast.to(result.room).emit(event, result.message);

    return Observable.create(observer =>
      observer.next({ event, data: result.message })
    );
  }

  @SubscribeMessage('join')
  @UseGuards(JwtAuthGuard)
  async onRoomJoin(socket, data: any): Promise<any> {
    socket.join(data[0]);

    const messages = await this.roomService.findMessages(data, 25);

    socket.emit('message', messages);
  }

  @SubscribeMessage('leave')
  @UseGuards(JwtAuthGuard)
  onRoomLeave(client, data: any): void {
    client.leave(data[0]);
  }
}
