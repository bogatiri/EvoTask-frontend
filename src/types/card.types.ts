import { IUser } from './auth.types'
import type { IBase } from './root.types'

export enum EnumCardPriority {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ICardResponse extends IBase {
	name: string
	completed: boolean
	priority?: EnumCardPriority | undefined
	order: number
	description?: string
	// list?:{
	// 	connect: {
	// 		id: string
	// 	}
	// }
	users: IUser[] | []
	list: string
	listId: string
}

export type TypeCardFormState = Partial<Omit<ICardResponse, 'id'>>

export interface ICardResponses extends IBase {
	name?: string;
	order?: number;
	description?: string;
	priority?: EnumCardPriority | undefined
	completed?: boolean;

	listId?: string;
}

export type TypeCardUpdateFormState = Partial<Omit<ICardResponses, 'id' >> 