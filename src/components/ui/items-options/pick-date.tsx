import { Calendar } from 'lucide-react'
import { Control, Controller } from 'react-hook-form'

import { TypeCardFormState } from '@/types/card.types'
import { TypeSprintUpdateFormState } from '@/types/sprint.types'

import { DatePicker } from '../task-edit/date-picker/DatePicker'

interface IPickDateProps {
	control: Control<TypeCardFormState | TypeSprintUpdateFormState>
	text?: string
	controlName?: string
	date: string
}

const PickDate = ({ control, controlName, text, date }: IPickDateProps) => {
	return (
		<div
			className={`flex gap-3 items-center ${controlName && 'border border-border gap-y-1 rounded-md p-2'}`}
		>
			<Calendar className='w-9 ' />
			{text && (
				<span className='font-semibold text-sm text-neutral-700 mb-2'>
					{text}
				</span>
			)}
			<Controller
				control={control}
				name={(controlName as keyof TypeSprintUpdateFormState) || 'updatedAt'}
				render={({ field: { value, onChange } }) => (
					<DatePicker
						onChange={onChange}
						value={date || ''}
						position='right'
					/>
				)}
			/>
		</div>
	)
}

export default PickDate
