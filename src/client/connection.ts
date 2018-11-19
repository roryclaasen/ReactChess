import { Promise } from 'es6-promise';
import io from 'socket.io-client';

import { lobby } from '../shared/socket.commands';
import { IBoard } from '../shared/game/interface';

export interface ISocketError {
	data: any;
	error: string;
	stack: Error;
}

export default class Connection {

	private socket: SocketIOClient.Socket;

	constructor() {
		this.socket = io();
	}

	public makeGame(): Promise<IBoard | ISocketError> {
		return this.process(lobby.make).then((data: IBoard) => {
			// TODO Update Board
			// ~board.read(data);
			return data;
		});
	}

	public joinGame(token: string): Promise<IBoard | ISocketError> {
		return this.process(lobby.join, { token }).then((data: IBoard) => {
			// TODO Update Board
			// ~board.read(data);
			return data;
		});
	}

	public leaveGame(): Promise<any | ISocketError> {
		return this.process(lobby.leave);
	}

	private process(event: string, options: any = {}): Promise<any | ISocketError> {
		return new Promise<any | ISocketError>((resolve, reject) => {
			this.socket.emit(event, options, (data: any) => {
				if (data.error) {
					console.error(data.error);
					reject(data);
				} else resolve(data);
			});
		});
	}

	public get id(): string {
		return this.socket.id;
	}
}
