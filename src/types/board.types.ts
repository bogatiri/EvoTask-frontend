import { IUser } from './auth.types'
import { IChatResponse } from './chat.types'
import type { IBase } from './root.types'

export interface IBoardResponse extends IBase {
	name: string
	description?: string
	imageId?:string
  imageThumbUrl?:string 
  imageFullUrl?:string 
  imageUserName?:string 
  imageLinkHTML?:string 
	users: IUser[]
	chats: IChatResponse[]
}

export type TypeBoardFormState = Partial<
	Omit<IBoardResponse, 'id' | 'updatedAt'>
>
