import { IRolesResponse } from './roles.types'

export interface IAuthForm {
	email: string
	password: string
	code: string,
	accessToken: string
}



export interface IUser {
	id: number
	name?: string
	email: string
	phone?: string
	lastName?:string
	post?: string
	organization?: string
	createdAt: Date
	about?: string
	roles: IRolesResponse[] 
	avatar? : string
	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
	sidebarWidth: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}



export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
export type TypeUserFormState = Partial<IUser>

