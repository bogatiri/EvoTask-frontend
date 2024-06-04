import { Hand } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'
import { Control, UseFormRegister } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import CardCheckbox from '@/components/ui/items-options/card-checkbox'
import CardPoints from '@/components/ui/items-options/card-points'
import CardPriority from '@/components/ui/items-options/card-priority'
import Description from '@/components/ui/items-options/description'
import PickDate from '@/components/ui/items-options/pick-date'

import { ICardResponse, TypeCardFormState } from '@/types/card.types'

import AddUser from '../../../../../../components/ui/items-options/addUser'
import Comments from '../../../../../../components/ui/items-options/comments'
import Copy from '../../../../../../components/ui/items-options/copy'
import Creator from '../../../../../../components/ui/items-options/creator'
import Delete from '../../../../../../components/ui/items-options/delete'
import Users from '../../../../../../components/ui/items-options/users'
import { usePickCard } from '../../../hooks/card/usePickCard'

import CardForm from './card-form'

interface ICardModalContentProps {
	data: ICardResponse
	boardId: string
	register: UseFormRegister<TypeCardFormState>
	control: Control<TypeCardFormState>
}

const CardModalContent = ({
	data,
	boardId,
	register,
	control
}: ICardModalContentProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const textareaRef = useRef<ElementRef<'textarea'>>(null)

	const { pickCard } = usePickCard()

	const onPick = (event: React.MouseEvent) => {
		event.stopPropagation()
		const cardId = data!.id
		pickCard({ cardId })
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	return (
		<DialogContent className='sm:max-w-md md:max-w-xl xl:max-w-2xl'>
			<DialogHeader>
				<DialogTitle>
					<div className='flex gap-4 items-center'>
						<CardCheckbox control={control} />
						<TransparentField {...register('name')} />
						<Creator creator={data.creator} />
					</div>
				</DialogTitle>
				<DialogDescription>
					You can change all of this attributes
				</DialogDescription>
			</DialogHeader>
			<div
				className={`${!data.parentId ? 'grid grid-cols-[1.1fr_0.5fr] gap-2 items-stretch space-x-2' : 'flex flex-row-reverse'}`}
			>
				{!data.parentId && (
					<div className='flex flex-col justify-between'>
						<div className='flex justify-between items-stretch'>
							<PickDate
								control={control}
								date={data.updatedAt || ''}
							/>
							<CardPriority control={control} />
							<CardPoints control={control} />
						</div>
						<div className='flex items-end m-0 w-full -px-2'>
							<CardForm
								parentId={data.id}
								ref={textareaRef}
								isEditing={isEditing}
								enableEditing={enableEditing}
								disableEditing={disableEditing}
							/>
						</div>
					</div>
				)}
				<div
					className={`flex ${data.parentId ? '' : ''} flex-col gap-y-2 border border-border p-2 rounded-md`}
				>
					{!data.parentId && (
						<Copy
							cardId={data.id}
							listId={data.listId}
						/>
					)}
					<Button
						onClick={onPick}
						variant='outline'
						type='submit'
						size='sm'
						className='px-3'
					>
						<Hand className='h-4 w-4' />
						<span className='ml-1'>Pick this card</span>
					</Button>
					<Delete cardId={data.id} />
					<Users data={data} />
				</div>
			</div>
			<div className='grid grid-cols-2 w-full gap-2'>
				<Description register={register} />
				<Comments data={data} />
			</div>
			<AddUser
				boardId={boardId}
				cardId={data.id}
			/>
		</DialogContent>
	)
}

export default CardModalContent
