import { IUser } from './auth.types'
import { IChatResponse } from './chat.types'
import type { IBase } from './root.types'
import { IRolesResponse } from '@/types/roles.types'

export interface IBoardResponse extends IBase {
	name: string
	description?: string
	imageId?:string
  imageThumbUrl?:string 
  imageFullUrl?:string 
  imageUserName?:string 
  imageLinkHTML?:string 
	users: IUser[]
	roles: IRolesResponse[]
	chats: IChatResponse[]
}

export type TypeBoardFormState = Partial<
	Omit<IBoardResponse, 'id' | 'updatedAt'>
>
