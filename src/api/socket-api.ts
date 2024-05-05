import { Socket, io } from 'socket.io-client'


class SocketApi{
	static socket: null | Socket = null

	static createConnection() : void{
		this.socket = io('http://localhost:4200')

		this.socket.on('connect', () => {
			console.log('connected')
		})

		this.socket.on('disconnect', (e) => {
			console.log('disconnected')
		})
	}
}

export default SocketApi