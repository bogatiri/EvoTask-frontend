import type { IBoardResponse, TypeBoardFormState } from '@/types/board.types'

import { axiosWithAuth } from '@/api/interceptors'

class BoardService {
	private BASE_URL = '/user/boards'

	async getBoardById(id: string) {
		const response = await axiosWithAuth.get<IBoardResponse>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}

	async getBoards() {
		const response = await axiosWithAuth.get<IBoardResponse[]>(this.BASE_URL)
		return response
	}

	async addUserToBoard({ email, boardId }: { email: string; boardId: string }) {
		try {
			const response = await axiosWithAuth.put(
				`${this.BASE_URL}/${boardId}/users`,
				{ email }
			)
			return response
		} catch (error) {
			throw error
		}
	}

	async createBoard(data: TypeBoardFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateBoard(id: string, data: TypeBoardFormState) {
		try {
			const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
			if (response.data.success === true) {
				return response.data
			} else {
				return response.data
			}
		} catch (error) {
			throw error
		}
	}

	async deleteBoard(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		if (response.data.success === true) {
			return response.data
		} else {
			return response.data
		}
	}
}

export const boardService = new BoardService()
