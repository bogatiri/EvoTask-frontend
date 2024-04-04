import type { IBase } from './root.types'

export interface IChatResponse extends IBase {
	name: string
	cardId?: string
	boardId: string
	listId?: string
}

export type TypeChatFormState = Partial<Omit<IChatResponse, 'id' | 'updatedAt'>>
