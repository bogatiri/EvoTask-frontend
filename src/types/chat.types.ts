import { IMessageResponse } from './message.types'
import type { IBase } from './root.types'

export interface IChatResponse extends IBase {
	name: string
	cardId?: string
	boardId: string
	listId?: string
	userId: string
	messages: IMessageResponse[]
}

export type TypeChatFormState = Partial<Omit<IChatResponse, 'id' | 'updatedAt'>>
