import type { IRolesResponse, TypeRolesFormState } from '@/types/roles.types'

import { axiosWithAuth } from '@/api/interceptors'

class RoleService {
	private BASE_URL = '/user/roles'

	async assignARole({userId, boardId, id}: {userId: string, boardId: string, id: string}) {
    const response = await axiosWithAuth.put<IRolesResponse[]>(`${this.BASE_URL}/${id}`, {userId, boardId})
    return response.data
  }

	async updateRoles(id: string, data: TypeRolesFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}
}

export const roleService = new RoleService()
