import { IUser, TypeUserFormState } from '@/types/auth.types'

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

	async setAvatar({ id, file }: { id: string; file: File }) {
		const formData = new FormData()
		formData.append('avatar', file)

		const response = await axiosWithAuth.post(
			`${this.BASE_URL}/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)

		return response
	}

	async getAvatar(avatar: string){
		const response = await axiosWithAuth.post(`${this.BASE_URL}/avatar`, {avatar})
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

