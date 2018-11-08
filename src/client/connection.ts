import { Promise } from 'es6-promise';
import io from 'socket.io-client';

import { lobby } from '../shared/socket.commands';
import { IBoard } from '../shared/game/interface';

export default class Connection {

	private socket: SocketIOClient.Socket;

	constructor() {
		this.socket = io();
	}

	public makeGame() {
		// TODO Make sure this is right
		return new Promise<IBoard>((resolve, reject) => {
			this.socket.emit(lobby.make, (data: any) => {
				if (data.error) reject(data);
				else resolve(data as IBoard);
			});
		});
	}

	public get id(): string {
		return this.socket.id;
	}
}
