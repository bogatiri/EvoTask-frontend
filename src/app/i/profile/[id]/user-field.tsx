import { UseFormRegister } from 'react-hook-form'

import { TransparentField } from '@/components/ui/fields/TransparentField'

import { IUser, TypeUserForm } from '@/types/auth.types'

interface IUserFieldProps {
	disabled: boolean
	text: string
	user: IUser
	placeholder: string
	register: UseFormRegister<TypeUserForm>
}

const UserField = ({
	user,
	placeholder,
	disabled,
	text,
	register
}: IUserFieldProps) => {
	return (
		<>
			<span className='cursor-default select-none ml-2 mt-2'>{text.replace(/\b\w/g, c => c.toUpperCase())}:</span>
			<div className='border border-border rounded-md p-2 mt-1 mb-2'>
				<TransparentField
					autoComplete='off'
					disabled={disabled}
					className={user.name ? 'opacity-100' : 'opacity-50'}
					placeholder={placeholder}
					{...register(text as keyof TypeUserForm)}
				/>
			</div>
		</>
	)
}

export default UserField
