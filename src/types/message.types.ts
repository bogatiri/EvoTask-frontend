import { IUser } from './auth.types'
import type { IBase } from './root.types'

export interface IMessageResponse extends IBase {
	text: string
	userId: string
	createdAt: string
	user: IUser
}

export type TypeMessageFormState = Partial<Omit<IMessageResponse, 'id' | 'updatedAt'>>
