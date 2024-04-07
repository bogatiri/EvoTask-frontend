import type { IBase } from './root.types'

export enum EnumCardPriority {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ICardResponse extends IBase {
	name: string
	isCompleted: boolean
	order?: number
	description?: string
	priority?: EnumCardPriority
	list:{
		connect: {
			id: string
		}
	}
}

export type TypeCardFormState = Partial<Omit<ICardResponse, 'id' | 'updatedAt'>>
