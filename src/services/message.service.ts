import type {
	IMessageResponse,
	TypeMessageFormState
} from '@/types/message.types'

import { axiosWithAuth } from '@/api/interceptors'

class MessageService {
	private BASE_URL = '/user/messages'

	async getMessages() {
		const response = await axiosWithAuth.get<IMessageResponse[]>(this.BASE_URL)
		return response
	}

	async createMessage(data: TypeMessageFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateMessage(id: string, data: TypeMessageFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteMessage(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const messageService = new MessageService()
