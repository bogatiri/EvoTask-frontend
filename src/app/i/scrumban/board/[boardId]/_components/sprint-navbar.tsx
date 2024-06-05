import { Play, RefreshCcw, Settings, StopCircle, Trash, ClipboardPlus } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import CardDate from '@/components/ui/items-options/pick-date'
import PickStatus from '@/components/ui/items-options/pick-status'
import {
	EnumSprintStatus,
	ISprintResponse,
	TypeSprintUpdateFormState
} from '@/types/sprint.types'

import { useDeleteSprint } from '../../../hooks/sprint/useDeleteSprint'
import { useSprintDebounce } from '../../../hooks/sprint/useSprintDebounce'
import { IUser } from '@/types/auth.types'
import { generateAndDownloadDocx } from '../../../hooks/report'

interface ISprintNavbarProps {
	item: ISprintResponse
	index: number
	isScrum: boolean
	users: IUser[]
	backToMainBoard: () => void
}

const SprintNavbar = ({
	item,
	index,
	isScrum,
	users,
	backToMainBoard
}: ISprintNavbarProps) => {
	const { deleteSprint } = useDeleteSprint()

	const { register, control, watch, reset, setValue, resetField } =
		useForm<TypeSprintUpdateFormState>({
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

	const handleDeleteSprint = () => {
		deleteSprint(item.id)
		backToMainBoard()
	}

	const handleStartSprint = () => {
		setValue('status', 'active' as EnumSprintStatus)
		const currentDate = new Date()
		setValue('startDate', currentDate.toISOString())
	}

	const handleStopSprint = () => {
		setValue('status', 'completed' as EnumSprintStatus)
		const currentDate = new Date()
		setValue('endDate', currentDate.toISOString())
	}

	useSprintDebounce({ watch, sprintId: item!.id })







	














	return (
		<>
			<Dialog>
				<div className='flex'>
					<div className='relative flex justify-between select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground opacity-70 hover:opacity-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer'>
						<span className='ml-1 flex gap-2'>
							{index + 1}.{''}Sprint
							<TransparentField
								disabled={!isScrum}
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
				<DialogContent className='w-full'>
					<DialogHeader>
						<DialogTitle>
							<div className='flex gap-3'>
								<RefreshCcw />
								<TransparentField
									disabled={!isScrum}
									autoFocus={false}
									{...register('name')}
								/>
							</div>
						</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						You can change all of this attributes
					</DialogDescription>
					<PickStatus
						status={item.status as EnumSprintStatus}
						control={control}
					/>
					<div className='flex gap-3'>
						<CardDate
							date={item.startDate || ''}
							control={control}
							text='Date Start'
							controlName='startDate'
						/>
						<CardDate
							date={item.endDate || ''}
							control={control}
							text='Date End'
							controlName='endDate'
						/>
					</div>
					<TransparentFieldTextarea
						disabled={!isScrum}
						placeholder='You can write goal to your sprint'
						{...register('goal')}
					/>
					<DialogClose className='justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex text-base items-center gap-4'>
						<div
							className='flex text-base items-center gap-4'
							onClick={handleDeleteSprint}
						>
							<span>Delete sprint</span>
							<Trash size={18} />
						</div>
					</DialogClose>
					<Button
						variant='outline'
						className='flex text-base items-center gap-4'
						onClick={handleStartSprint}
					>
						<span>Start sprint</span>
						<Play size={18} />
					</Button>
					<Button
						variant='outline'
						className='flex text-base items-center gap-4'
						onClick={handleStopSprint}
					>
						<span>End sprint</span>
						<StopCircle size={18} />
					</Button>
					{item.status === 'completed'  && (

					<Button
						variant='outline'
						className='flex text-base items-center gap-4'
						onClick={() => generateAndDownloadDocx({item, users})}
					>
						<span>Generate report</span>
						<ClipboardPlus size={18} />
					</Button>
					) }
				</DialogContent>
			</Dialog>
		</>
	)
}

export default SprintNavbar
