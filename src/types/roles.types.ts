import { IUser } from './auth.types'
import type { IBase } from './root.types'

export enum EnumRolesPriority {
	scrum_master = 'scrum_master',
	project_owner = 'project_owner',
	team_member = 'team_member'
}

export interface IRolesResponse extends IBase {
	name?: EnumRolesPriority
	userId?: string
	users: IUser[] | []
	boardId: string
}

export type TypeRolesFormState = Partial<Omit<IRolesResponse, 'id'>>
