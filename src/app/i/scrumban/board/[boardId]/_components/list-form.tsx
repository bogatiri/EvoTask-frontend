'use client'

import { Plus, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'

import { useCreateList } from '../../../hooks/list/useCreateList'

import { ListWrapper } from './list-wrapper'

interface IListForm{
	sprintId?: string | undefined
}

const ListForm = ({sprintId}: IListForm) => {
	const params = useParams()
	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const [isEditing, setIsEditing] = useState(false)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)
	const { createList } = useCreateList()

	const onSubmit = (formData: FormData) => {
		const name = formData.get('title') as string
		const board = formData.get('boardId') as string
		sprintId
			? createList({
					name,
					board,
					sprintId
				})
			: createList({
					name,
					board
				})
		disableEditing()
	}

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					action={onSubmit}
					ref={formRef}
					className='w-full p-3 rounded-md mt-2 bg-[#0e0f0f] space-y-4 shadow-md'
				>
					<FormInput
						ref={inputRef}
						id='title'
						className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
						placeholder='Enter list title...'
					/>
					<input
						hidden
						defaultValue={params.boardId}
						name='boardId'
					/>
					<div className='flex items-center gap-x-1'>
						<FormSubmit>Add list</FormSubmit>
						<Button
							asChild
							onClick={disableEditing}
							size='sm'
							variant='ghost'
						>
							<X className='h-5 w-5' />
						</Button>
					</div>
				</form>
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className='w-full rounded-md bg-[#0e0f0f]/50 hover:bg-[#0e0f0f]/80 transition p-3 mt-2 flex items-center font-medium text-sm'
			>
				<Plus className='h-4 w-4 mr-2' />
				Add a list
			</button>
		</ListWrapper>
	)
}

export default ListForm
