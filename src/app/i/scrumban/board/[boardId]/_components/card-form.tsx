'use client'

import { Plus, X } from 'lucide-react'
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'

import { ICardResponse } from '@/types/card.types'

import { useCreateCard } from '../../../hooks/card/useCreateCard'

interface CardFormProps {
	listId: string
	enableEditing: () => void
	disableEditing: () => void
	isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ listId, enableEditing, disableEditing, isEditing }, ref) => {
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

		const onSubmit = (formData: FormData) => {
			const name = formData.get('title') as string
			const list = formData.get('listId') as string
			createCard({
				name,
				list
			})
			disableEditing()
		}

		if (isEditing) {
			return (
				<form
					ref={formRef}
					action={onSubmit}
					className='m-1 py-0.5 px-1 space-y-4'
				>
					<FormTextarea
						id='title'
						onKeyDown={onTextareakeyDown}
						ref={ref}
						placeholder='Enter a title for this card...'
					/>
					<input
						hidden
						id='listId'
						name='listId'
						defaultValue={listId}
					/>
					<div className='flex items-center gap-x-1'>
						<FormSubmit>Add card</FormSubmit>
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
			<div className='pt-2 px-2'>
				<Button
					onClick={enableEditing}
					className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
					size='sm'
					variant='ghost'
				>
					<Plus className='h-4 w-4 mr-2' />
					Add a card
				</Button>
			</div>
		)
	}
)

CardForm.displayName = 'CardForm'
