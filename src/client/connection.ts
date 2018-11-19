import { Promise } from 'es6-promise';
import io from 'socket.io-client';

import { lobby } from '../shared/socket.commands';
import { IOnlineBoard, IBoard, ISocketError } from '../shared/interface';

export default class Connection {

	private socket: SocketIOClient.Socket;

	constructor() {
		this.socket = io();
	}

	public makeGame(): Promise<(IBoard & IOnlineBoard) | ISocketError> {
		return this.process(lobby.make).then((data: IBoard & IOnlineBoard) => {
			// TODO Update Board
			// ~board.read(data);
			return data;
		});
	}

	public joinGame(token: string): Promise<(IBoard & IOnlineBoard) | ISocketError> {
		return this.process(lobby.join, { token }).then((data: IBoard & IOnlineBoard) => {
			// TODO Update Board
			// ~board.read(data);
			return data;
		});
	}

	public leaveGame(): Promise<any | ISocketError> {
		return this.process(lobby.leave);
	}

	/**
	 * Helper function to turn Socket.io emit into a Promise
	 * @private
	 * @param {string} event The Event to emit
	 * @param {*} [options={}] Any data that wants to get passed with the web socket
	 * @returns {Promise<any | ISocketError>} Returns the result of the packet or an error
	 * @memberof Connection
	 */
	private process(event: string, options: any = {}): Promise<any | ISocketError> {
		return new Promise<any | ISocketError>((resolve, reject) => {
			this.socket.emit(event, options, (data: any) => {
				if (data.error) {
					console.error(data.event, data.error);
					reject(data);
				} else resolve(data);
			});
		});
	}

	public get id(): string {
		return this.socket.id;
	}
}
