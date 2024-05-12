import type { ISprintResponse, TypeSprintFormState } from '@/types/sprint.types'

import { axiosWithAuth } from '@/api/interceptors'


class SprintService {
	private BASE_URL = '/user/sprints'

	async getSprintById(sprintId: string) {
    const response = await axiosWithAuth.get<ISprintResponse[]>(`${this.BASE_URL}/${sprintId}`)
    return response.data
  }

	async getSprintBySprintId(id: string) {
    const response = await axiosWithAuth.get<ISprintResponse>(`${this.BASE_URL}/sprint/${id}`)
    return response.data
  }

	async getSprintsByBoardId(id: string) {
		const response = await axiosWithAuth.get<ISprintResponse[]>(`${this.BASE_URL}/${id}`)
		return response
	}

	async createSprint(data: TypeSprintFormState) {
		try {
			const response = await axiosWithAuth.post(this.BASE_URL, data)
			return response.data
		} catch (error) {
		
		}
	}


	// async addUserToSprint({email, boardId, sprintId} : {email: string, boardId: string, sprintId: string}) {
	// 	try {
	// 				const response = await axiosWithAuth.put(
	// 		`${this.BASE_URL}/${boardId}/users`,
	// 		{ email, sprintId }
	// 	)
	// 	return response
	// 	} catch (error) {
	// 		throw error
	// 	}
	// }



	async updateSprint(id: string, data: TypeSprintFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteSprint(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const sprintService = new SprintService()
