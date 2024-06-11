import { UseFormRegister } from 'react-hook-form'

import { TransparentField } from '@/components/ui/fields/TransparentField'

import { IUser, TypeUserUpdateForm } from '@/types/auth.types'

interface IUserFieldProps {
	disabled: boolean
	text: string
	user: IUser
	placeholder: string
	register: UseFormRegister<TypeUserUpdateForm>
	type?: string
}

const UserField = ({
	user,
	placeholder,
	disabled,
	text,
	type,
	register
}: IUserFieldProps) => {
	return (
		<>
			<span className='cursor-default select-none ml-2 mt-2'>{text.replace(/\b\w/g, c => c.toUpperCase())}:</span>
			<div className='border border-border rounded-md p-2 mt-1 mb-2'>
				<TransparentField
					autoComplete='off'
					type={type}
					disabled={disabled}
					className={user.name ? 'opacity-100' : 'opacity-50'}
					placeholder={placeholder}
					{...register(text as keyof TypeUserUpdateForm)}
				/>
			</div>
		</>
	)
}

export default UserField
