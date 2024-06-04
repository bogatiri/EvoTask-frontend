import { Coins } from 'lucide-react'
import { Control, Controller } from 'react-hook-form'

import { SingleSelect } from '../task-edit/SingleSelect'
import { TypeCardFormState } from '@/types/card.types'

interface ICardPointsProps {
	control: Control<TypeCardFormState>
}


const CardPoints = ({control} : ICardPointsProps) => {
	return (
		<div className='flex gap-3'>
			<Coins />
			<Controller
				control={control}
				name='points'
				render={({ field: { value, onChange } }) => (
					<SingleSelect
						data={['1', '2', '3', '4'].map(item => ({
							value: item,
							label: item
						}))}
						text='Points'
						onChange={onChange}
						value={value || ''}
					/>
				)}
			/>
		</div>
	)
}

export default CardPoints
