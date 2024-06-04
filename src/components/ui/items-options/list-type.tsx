import { Control, Controller } from 'react-hook-form'

import { TypeListFormState } from '@/types/list.types'

import { TypeSelect } from '../list-edit/TypeSelect'

interface IListTypeProps {
	control: Control<TypeListFormState>
}

const ListType = ({ control }: IListTypeProps) => {
	return (
		<Controller
			control={control}
			name='type'
			render={({ field: { value, onChange } }) => (
				<TypeSelect
					data={['backlog', 'to_do', 'in_progress', 'done', 'blocked', 'feedback'].map(item => ({
						value: item,
						label: item
					}))}
					text='Type'
					onChange={onChange}
					value={value || ''}
				/>
			)}
		/>
	)
}

export default ListType
