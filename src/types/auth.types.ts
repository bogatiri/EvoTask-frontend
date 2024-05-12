export interface IAuthForm {
	email: string
	password: string
	code: string,
	accessToken: string
}

export enum EnumUserRole {
  scrum_master ='scrum-master',
  project_Owner = 'project-owner',
  administrator = 'administrator',
  project_manager ='project-manager',
  team_member ='team-member',
  developer ='developer',
  analyst ='analyst',
  qa_tester ='qa-tester',
  stakeholder ='stakeholder',
  auditor ='auditor'
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
	role? : EnumUserRole
	avatar? : string
	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}



export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
export type TypeUserFormState = Partial<IUser>

