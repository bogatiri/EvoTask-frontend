import { IUser, TypeUserForm, TypeUserFormState } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	user: IUser
	statistics: {
		label: string
		value: string
	}[]
}

class UserService {
	private BASE_URL = '/user/profile'

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}

	async getUserById(id: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/${id}`)
		return response.data
	}

	async update(data: TypeUserFormState) {
		try {
			const response = await axiosWithAuth.put(this.BASE_URL, data)
			return response.data
		} catch (error) {
			console.error(error)
		}
	}
}

export const userService = new UserService()
