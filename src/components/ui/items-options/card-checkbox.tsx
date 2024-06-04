import { Control, Controller } from 'react-hook-form'

import Checkbox from '@/components/ui/check'
import { TypeCardFormState } from '@/types/card.types'

interface ICardCheckboxProps {
	control: Control<TypeCardFormState>
}


const CardCheckbox = ({control} : ICardCheckboxProps) => {
	return (
		<Controller
		control={control}
		name='completed'
		render={({ field: { value, onChange } }) => (
			<Checkbox
				onChange={onChange}
				checked={value}
				color='green'
			/>
		)}
	/>
	)
}

export default CardCheckbox
