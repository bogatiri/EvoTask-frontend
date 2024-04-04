import type {
	ICommentResponse,
	TypeCommentFormState
} from '@/types/comment.types'

import { axiosWithAuth } from '@/api/interceptors'

class CommentService {
	private BASE_URL = '/user/comments'

	async getComments() {
		const response = await axiosWithAuth.get<ICommentResponse[]>(this.BASE_URL)
		return response
	}

	async createComment(data: TypeCommentFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateComment(id: string, data: TypeCommentFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteComment(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const commentService = new CommentService()
