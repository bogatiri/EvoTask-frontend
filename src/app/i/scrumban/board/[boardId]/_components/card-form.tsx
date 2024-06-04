'use client'

import { Plus, X } from 'lucide-react'
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'

import { useCreateCard } from '../../../hooks/card/useCreateCard'
import { useCreateSubtask } from '../../../hooks/card/useCreateSubtask'

interface CardFormProps {
	listId?: string
	parentId?: string
	enableEditing: () => void
	disableEditing: () => void
	isEditing: boolean
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ listId, enableEditing, disableEditing, isEditing, parentId }, ref) => {
		const formRef = useRef<ElementRef<'form'>>(null)

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				disableEditing()
			}
		}

		useOnClickOutside(formRef, disableEditing)
		useEventListener('keydown', onKeyDown)

		const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				formRef.current?.requestSubmit()
			}
		}

		const { createCard } = useCreateCard()

		const { createSubtask } = useCreateSubtask()

		const onSubmit = (formData: FormData) => {
			const name = formData.get('name') as string
			const list = formData.get('listId') as string
			createCard({
				name,
				list
			})
			disableEditing()
		}

		const onCreateSubtask = (formData: FormData) => {
			const name = formData.get('name') as string
			const parentId = formData.get('parentId') as string
			createSubtask({
				name,
				parentId
			})
			disableEditing()
		}

		if (isEditing) {
			return (
				<form
					ref={formRef}
					action={parentId ? onCreateSubtask : onSubmit}
					className=' w-full py-1 px-2 space-y-4'
				>
					<FormTextarea
						id='name'
						onKeyDown={onTextareakeyDown}
						ref={ref}
						placeholder='Enter a name for this card...'
					/>
					{listId ? (
						<input
							hidden
							id='listId'
							name='listId'
							defaultValue={listId}
						/>
					) : (
						<input
							hidden
							id='parentId'
							name='parentId'
							defaultValue={parentId}
						/>
					)}
					<div className='flex items-center gap-x-1'>
						<FormSubmit>{parentId ? 'Add a subtask' : 'Add a card'}</FormSubmit>
						<Button
							onClick={disableEditing}
							size='sm'
							variant='ghost'
						>
							<X className='h-5 w-5' />
						</Button>
					</div>
				</form>
			)
		}

		return (
			<div className='pt-2 px-2 w-full'>
				<Button
					onClick={enableEditing}
					className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
					size='sm'
					variant='ghost'
				>
					<Plus className='h-4 w-4 mr-2' />
					{parentId ? 'Add a subtask' : 'Add a card'}
				</Button>
			</div>
		)
	}
)

export default CardForm

CardForm.displayName = 'CardForm'
