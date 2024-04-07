import type { IBase } from './root.types'

export interface IBoardResponse extends IBase {
	name: string
	description?: string
	imageId?:string
  imageThumbUrl?:string 
  imageFullUrl?:string 
  imageUserName?:string 
  imageLinkHTML?:string 
}

export type TypeBoardFormState = Partial<
	Omit<IBoardResponse, 'id' | 'updatedAt'>
>
