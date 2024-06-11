import { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	},

	async sendConfirmationCode(data: IAuthForm) {
		const response = await axiosClassic.post('/auth/send-code', data)
		return response.data
	},

	async confirmCode(email: string, code: string, data: IAuthForm) {
		const password = data.password
		try {
			const response = await axiosClassic.post<IAuthResponse>(
				'/auth/check-code',
				{
					checkCodeDto: {
						email,
						code
					},
					dto: {
						email,
						password
					}
				}
			)
			if (response.data.accessToken) {
				saveTokenStorage(response.data.accessToken)
			}

			return response
		} catch (error: any) {
			if (error.response) {
				console.error(error.response.data)
				// return Promise.reject(error.response.data || 'Error')
				throw error
			} else {
				console.error(error)
				// return Promise.reject('Error')
				throw error
			}
		}
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}
}
