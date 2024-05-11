import type { ICardResponse, TypeCardFormState } from '@/types/card.types'

import { axiosWithAuth } from '@/api/interceptors'
import axios from 'axios'

interface ICardOrderUpdate {
	id: string
	order: number
}

class CardService {
	private BASE_URL = '/user/cards'

	async getCardById(id: string) {
    const response = await axiosWithAuth.get<ICardResponse[]>(`${this.BASE_URL}/${id}`)
    return response.data
  }

	async getCardByCardId(id: string) {
    const response = await axiosWithAuth.get<ICardResponse>(`${this.BASE_URL}/card/${id}`)
    return response.data
  }

	async getCards() {
		const response = await axiosWithAuth.get<ICardResponse[]>(this.BASE_URL)
		return response
	}

	async createCard(data: TypeCardFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async copyCard({cardId, listId} : {cardId: string, listId: string}){
		const response = await axiosWithAuth.post(`${this.BASE_URL}/copy`, {cardId, listId})
		return response
	}

	async addUserToCard({email, boardId, cardId} : {email: string, boardId: string, cardId: string}) {
		try {
					const response = await axiosWithAuth.put(
			`${this.BASE_URL}/${boardId}/users`,
			{ email, cardId }
		)
		return response
		} catch (error) {
			throw error
		}
	}

	async updateOrder(cardsWithNewOrder: ICardOrderUpdate[]) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update-order`, {
			cards: cardsWithNewOrder
		})
		return response
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
