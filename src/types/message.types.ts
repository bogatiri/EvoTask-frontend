import type { IBase } from './root.types'

export interface IMessageResponse extends IBase {
	text: string
}

export type TypeMessageFormState = Partial<Omit<IMessageResponse, 'id' | 'updatedAt'>>
