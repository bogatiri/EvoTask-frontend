import { IUser } from './auth.types'
import { ICommentResponse } from './comment.types'
import type { IBase } from './root.types'

export enum EnumCardPriority {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ICardResponse extends IBase {
	name?: string
	completed: boolean
	priority?: EnumCardPriority | undefined
	order: number
	description?: string
	comments?: ICommentResponse[] | []
	points?: string
	creator: IUser,
	users: IUser[] | []
	list: string
	listId: string
	parentId?: string
	sprintId?: string
	isSubtaskVisible: boolean
	subtasks: ICardResponse[]
}

export type TypeCardFormState = Partial<Omit<ICardResponse, 'id'>>

export interface ICardResponses extends IBase {
	name?: string;
	order?: number;
	description?: string;
	priority?: EnumCardPriority | undefined
	completed?: boolean;
	listId?: string;
	list?: string
}

export type TypeCardUpdateFormState = Partial<Omit<ICardResponses, 'id' >> 