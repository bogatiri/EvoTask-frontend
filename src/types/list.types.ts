import { ICardResponse } from './card.types'
import type { IBase } from './root.types'

export enum EnumListType {
	backlog = 'backlog',
	to_do = 'to_do',
	in_progress = 'in_progress',
	done = 'done',
	blocked = 'blocked',
	feedback = 'feedback'
}

export interface IListResponse extends IBase {
	name: string
	order: number
	description?: string
	type?: EnumListType | undefined
	cards: ICardResponse[] | []
	boardId: string
	board: string
	sprintId?: string
}

export type TypeListFormState = Partial<Omit<IListResponse, 'id' | 'updatedAt'>>

export interface IListResponses extends IBase {
	name?: string
	order?: number
	description?: string
	type?: EnumListType | undefined
	boardId?: string
}

export type TypeListUpdateFormState = Partial<Omit<IListResponses, 'id'>>
