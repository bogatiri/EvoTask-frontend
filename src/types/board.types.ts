import type { IBase } from './root.types'

export interface IBoardResponse extends IBase {
	name: string
	description?: string
}

export type TypeBoardFormState = Partial<
	Omit<IBoardResponse, 'id' | 'updatedAt'>
>
