import { IListResponse } from './list.types'
import type { IBase } from './root.types'

export enum EnumSprintStatus {
	planned = 'planned',
	active = 'active',
	completed = 'completed'
}

export interface ISprintResponse extends IBase {
	name?: string
	status?: EnumSprintStatus | undefined
	goal?: string
	startDate?: string
	endDate?: string
	// users: IUser[] | []
	list: IListResponse[]
	boardId: string
}

export type TypeSprintFormState = Partial<Omit<ISprintResponse, 'id'>>

export interface ISprintResponses extends IBase {
	name?: string
	order?: number
	description?: string
	priority?: EnumSprintStatus | undefined
	completed?: boolean

	listId?: string
}

export type TypeSprintUpdateFormState = Partial<Omit<ISprintResponses, 'id'>>
