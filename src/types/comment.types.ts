import { IUser } from './auth.types'
import type { IBase } from './root.types'

export interface ICommentResponse extends IBase {
	text: string
	cardId?: string
	boardId: string
	listId?: string
	userId?: string
	user: IUser
	createdAt: string
}

export type TypeCommentFormState = Partial<Omit<ICommentResponse, 'id' | 'updatedAt'>>
