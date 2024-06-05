import { IUser } from './auth.types'
import { IChatResponse } from './chat.types'
import type { IBase } from './root.types'
import { IRolesResponse } from '@/types/roles.types'
import { EnumSprintStatus, ISprintResponse } from './sprint.types'



export interface IBoardResponse extends IBase {
	name: string
	description?: string
	imageId?:string
  imageThumbUrl?:string 
  imageFullUrl?:string 
  imageUserName?:string 
  imageLinkHTML?:string 
	status?: EnumSprintStatus 
	users: IUser[]
	roles: IRolesResponse[]
	chats: IChatResponse[]
	userId: string
	sprints?: ISprintResponse[]
	creator: IUser
}

export type TypeBoardFormState = Partial<
	Omit<IBoardResponse, 'id' >
>
