import type { IBase } from './root.types'

export interface ICommentResponse extends IBase {
	text: string
	chatId?: string
	boardId: string
	listId?: string
}

export type TypeCommentFormState = Partial<Omit<ICommentResponse, 'id' | 'updatedAt'>>
