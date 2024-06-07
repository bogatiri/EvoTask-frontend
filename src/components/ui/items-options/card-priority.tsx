import { BarChart } from 'lucide-react'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

import { SingleSelect } from '../task-edit/SingleSelect'
import { TypeCardFormState } from '@/types/card.types'

interface ICardPriorityProps {
	control: Control<TypeCardFormState>
}

const CardPriority = ({control} : ICardPriorityProps) => {
	return (
		<div className='flex gap-3 '>
		<BarChart  />
		<Controller
			control={control}
			name='priority'
			render={({ field: { value, onChange } }) => (
				<SingleSelect
					data={['high', 'medium', 'low'].map(item => ({
						value: item,
						label: item
					}))}
					text='Priority'
					onChange={onChange}
					value={value || ''}
				/>
			)}
		/>
	</div>
	)
}

export default CardPriority