import { CalendarX2, RefreshCcw, Settings, Trash } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { TransparentFieldTextarea } from '@/components/ui/fields/TransparentFieldTextarea'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import { ISprintResponse, TypeSprintFormState } from '@/types/sprint.types'

import { useDeleteSprint } from '../../../hooks/sprint/useDeleteSprint'
import { useSprintDebounce } from '../../../hooks/sprint/useSprintDebounce'

interface ISprintNavbarProps {
	item: ISprintResponse
	index: number
	isOpen: boolean
}

const SprintNavbar = ({ item, index, isOpen }: ISprintNavbarProps) => {
	const { deleteSprint, isDeletePending } = useDeleteSprint()

	const { register, control, watch, reset } = useForm<TypeSprintFormState>({
		defaultValues: {
			name: item?.name,
			goal: item?.goal,
			status: item?.status,
			startDate: item?.startDate,
			endDate: item?.endDate
		}
	})

	useEffect(() => {
		if (item) {
			reset({
				name: item.name,
				goal: item.goal,
				status: item.status,
				startDate: item.startDate,
				endDate: item.endDate
			})
		}
	}, [item, reset])

	useSprintDebounce({ watch, sprintId: item!.id })
	return (
		<>
			<Dialog>
				<div className='flex'>
					<div className='relative flex justify-between select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground opacity-70 hover:opacity-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer'>
						<span className='ml-1 flex gap-2'>
							{index + 1}.{''}Sprint
							<TransparentField
								disabled={true}
								autoFocus={false}
								{...register('name')}
							/>
						</span>
					</div>
					<DialogTrigger className='p-2 hover:bg-muted rounded-md cursor-pointer'>
						<Settings
							size={16}
							className=''
						/>
					</DialogTrigger>
				</div>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							<div className='flex gap-3'>
								<RefreshCcw />
								<TransparentField
									autoFocus={false}
									{...register('name')}
								/>
							</div>
						</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						You can change all of this attributes
					</DialogDescription>
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
								value={value || ''}
							/>
						)}
					/>
					<div className='grid border border-border gap-y-1 rounded-md p-2'>
						<div className='flex gap-x-3 '>
							<CalendarX2 size={18} />
							<p className='font-semibold text-sm text-neutral-700 mb-2'>
								Date start
							</p>
						</div>
						<Controller
							control={control}
							name='startDate'
							render={({ field: { value, onChange } }) => (
								<DatePicker
									onChange={onChange}
									value={value || ''}
									position='right'
								/>
							)}
						/>
					</div>
					<div className='grid border border-border gap-y-1 rounded-md p-2'>
						<div className='flex gap-x-3 '>
							<CalendarX2 size={18} />
							<p className='font-semibold text-sm text-neutral-700 mb-2'>
								Date end
							</p>
						</div>
						<Controller
							control={control}
							name='endDate'
							render={({ field: { value, onChange } }) => (
								<DatePicker
									onChange={onChange}
									value={value || ''}
									position='right'
								/>
							)}
						/>
					</div>
					<TransparentFieldTextarea
						placeholder='You can write goal to your sprint'
						{...register('goal')}
					/>
					<DialogClose className=' inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-primary text-primary-foreground hover:bg-primary/90'>
						<div
							className='flex text-base items-center gap-4'
							onClick={() => deleteSprint(item.id)}
						>
							<span>Delete sprint</span>
							<Trash size={18} />
						</div>
					</DialogClose>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default SprintNavbar
