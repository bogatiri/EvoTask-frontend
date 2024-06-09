import { TrendingUp } from 'lucide-react'
import { Control, Controller } from 'react-hook-form'

import { TypeSprintUpdateFormState } from '@/types/sprint.types'

import { SingleSelect } from '../task-edit/SingleSelect'
import { TypeBoardFormState } from '@/types/board.types'

interface ISprintStatusProps {
	control: Control<TypeSprintUpdateFormState | TypeBoardFormState>
	status: string
}

const PickStatus = ({ control, status }: ISprintStatusProps) => {
	return (
		<div className='flex gap-3 justify-center'>
			<TrendingUp />
			<Controller
				control={control}
				name='status'
				render={({ field: { value, onChange } }) => (
					<SingleSelect

						text='Set status'
						data={['planned', 'active', 'completed'].map(item => ({
							value: item,
							label: item
						}))}
						onChange={onChange}
						value={ status || ''}
					/>
				)}
			/>
		</div>
	)
}

export default PickStatus
