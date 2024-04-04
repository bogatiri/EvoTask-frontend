import type { IChatResponse, TypeChatFormState } from '@/types/chat.types'

import { axiosWithAuth } from '@/api/interceptors'

class ChatService {
	private BASE_URL = '/user/chats'

	async getChats() {
		const response = await axiosWithAuth.get<IChatResponse[]>(this.BASE_URL)
		return response
	}

	async createChat(data: TypeChatFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateChat(id: string, data: TypeChatFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteChat(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const chatService = new ChatService()
