import { type Dispatch, type SetStateAction } from 'react'

import { ITaskResponse } from '@/types/task.types'

import styles from './ListView.module.scss'

interface IListAddRowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListAddRowInput({ filterDate, setItems }: IListAddRowInput) {
	const addRow = () => {
		setItems(prev => {
			if (!prev) return
			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}

	return (
		<div className={styles.addRow}>
			<button
				className='italic opacity-40 text-sm'
				onClick={addRow}
			>
				Add Task...
			</button>
		</div>
	)
}
