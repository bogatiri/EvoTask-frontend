import type { ICardResponse, TypeCardFormState } from '@/types/card.types'

import { axiosWithAuth } from '@/api/interceptors'

interface ICardOrderUpdate {
	id: string
	order: number
}

class CardService {
	private BASE_URL = '/user/cards'

	async getCards() {
		const response = await axiosWithAuth.get<ICardResponse[]>(this.BASE_URL)
		return response
	}

	async createCard(data: TypeCardFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateOrder(cardsWithNewOrder: ICardOrderUpdate[]) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/updateOrder`, {
			cards: cardsWithNewOrder
		})
		return response.data
	}

	async updateCard(id: string, data: TypeCardFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteCard(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const cardService = new CardService()
