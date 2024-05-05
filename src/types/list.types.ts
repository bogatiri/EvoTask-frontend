import { ICardResponse, ICardResponses } from './card.types'
import type { IBase } from './root.types'

export enum EnumListType {
  backlog ='backlog',
  to_do = 'to-do',
  in_progress ='in-progress',
  done = 'done'
}

export interface IListResponse extends IBase {
	name: string
	order: number
	description?: string
	type?: EnumListType | undefined
	cards: ICardResponse[] | [] 
	board: {
		connect: {
			id: string
		}
	}
	boardId: string
}

export type TypeListFormState = Partial<Omit<IListResponse, 'id' | 'updatedAt'>>


export interface IListResponses extends IBase {
	name?: string;
	order?: number;
	description?: string;
	type?: EnumListType | undefined
	boardId?: string;
}

export type TypeListUpdateFormState = Partial<Omit<IListResponses, 'id' >> 