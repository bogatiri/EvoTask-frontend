import cn from 'clsx'
import { Copy, GripVertical, Loader, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/check'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'

import styles from './KanbanView.module.scss'

interface IKanbanCard {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanCard({ item, setItems }: IKanbanCard) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<>
			<Dialog>
				<DialogTrigger>
					<div
						className={cn(
							styles.card,
							{
								[styles.completed]: watch('isCompleted')
							},
							'animation-opacity'
						)}
					>
						<div className={styles.cardHeader}>
							<button aria-describedby='todo-item'>
								<GripVertical className={styles.grip} />
							</button>
<div
onClick={event => event.stopPropagation()}>


							<Controller
								control={control}
								name='isCompleted'
								render={({ field: { value, onChange } }) => (
									<Checkbox
										onChange={onChange}
										checked={value}
										/>
									)}
									/>
									</div>

							<TransparentField {...register('name')} />
						</div>

						<div className={cn(styles.cardBody, 'grid grid-cols-2 gap-2')}>
							<Controller
								control={control}
								name='createdAt'
								render={({ field: { value, onChange } }) => (
									<DatePicker
										onChange={onChange}
										value={value || ''}
										position='left'
									/>
								)}
							/>

							<Controller
								control={control}
								name='priority'
								render={({ field: { value, onChange } }) => (
									<SingleSelect
										data={['high', 'medium', 'low'].map(item => ({
											value: item,
											label: item
										}))}
										onChange={onChange}
										value={value || ''}
									/>
								)}
							/>
						</div>

						<div className={styles.cardActions}>
							<button
								onClick={() =>
									item.id
										? deleteTask(item.id)
										: setItems(prev => prev?.slice(0, -1))
								}
								className='opacity-50 transition-opacity hover:opacity-100'
							>
								{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
							</button>
						</div>
					</div>
				</DialogTrigger>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>
							<TransparentField {...register('name')} />
						</DialogTitle>
						<DialogDescription>
							You can change all of this attributes
						</DialogDescription>
					</DialogHeader>
					<div className='flex items-center space-x-2'>
						<div className='grid grid-cols-2 gap-12 flex-1'>
							{/* <Label
								htmlFor='link'
								className='sr-only'
							>
								Link
							</Label>
							<Input
								id='link'
								defaultValue='https://ui.shadcn.com/docs/installation'
								readOnly
							/> */}
							<Controller
								control={control}
								name='createdAt'
								render={({ field: { value, onChange } }) => (
									<DatePicker
										onChange={onChange}
										value={value || ''}
										position='left'
									/>
								)}
							/>

							<Controller
								control={control}
								name='priority'
								render={({ field: { value, onChange } }) => (
									<SingleSelect
										data={['high', 'medium', 'low'].map(item => ({
											value: item,
											label: item
										}))}
										onChange={onChange}
										value={value || ''}
									/>
								)}
							/>
						</div>
						<Button
							type='submit'
							size='sm'
							className='px-3'
						>
							<span className='sr-only'>Copy</span>
							<Copy className='h-4 w-4' />
						</Button>
					</div>
					<DialogFooter className='sm:justify-start'></DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
