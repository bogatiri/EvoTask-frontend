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
	type?: EnumListType
	board: {
		connect: {
			id: string
		}
	}
}

export type TypeListFormState = Partial<Omit<IListResponse, 'id' | 'updatedAt'>>
