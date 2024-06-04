import type { ISprintResponse, TypeSprintFormState } from '@/types/sprint.types'

import { axiosWithAuth } from '@/api/interceptors'

class SprintService {
	private BASE_URL = '/user/sprints'

	async getSprintById(sprintId: string) {
		const response = await axiosWithAuth.get<ISprintResponse[]>(
			`${this.BASE_URL}/${sprintId}`
		)
		return response.data
	}

	async getSprintBySprintId(id: string) {
		const response = await axiosWithAuth.get<ISprintResponse>(
			`${this.BASE_URL}/sprint/${id}`
		)
		return response.data
	}

	async getSprintsByBoardId(id: string) {
		const response = await axiosWithAuth.get<ISprintResponse[]>(
			`${this.BASE_URL}/${id}`
		)
		return response
	}

	async createSprint(data: TypeSprintFormState) {
		try {
			const response = await axiosWithAuth.post(this.BASE_URL, data)
			return response.data
		} catch (error) {}
	}

	async updateSprint(id: string, data: TypeSprintFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		if (response.data.success === true) {
			return response.data
		} else {
			return response.data
		}
	}

	async deleteSprint(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		if (response.data.success === true) {
			return response.data
		} else {
			return response.data
		}
	}
}

export const sprintService = new SprintService()
