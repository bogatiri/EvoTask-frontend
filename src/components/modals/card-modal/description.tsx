'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AlertCircle, AlignLeft, CircleDashed, CircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'

import { ICardResponse, TypeCardFormState } from '@/types/card.types'

import { bindUpdateCard } from '@/hooks/update-card'
import { useAction } from '@/hooks/use-action'

// import { updateCard } from '@/actions/update-card'
import { useCardDebounce } from '@/app/i/scrumban/hooks/card/useCardDebounce'
import { TransparentFieldTextarea } from '@/components/ui/fields/TransparentFieldTextarea'

interface DescriptionProps {
	data: ICardResponse
}

export const Description = ({ data }: DescriptionProps) => {
	const params = useParams()
	const queryClient = useQueryClient()

	const [isEditing, setIsEditing] = useState(false)

	const formRef = useRef<ElementRef<'form'>>(null)
	const textareaRef = useRef<ElementRef<'textarea'>>(null)
	const [description, setDescription] = useState(data?.description || '')

	const { register, control, watch } = useForm<TypeCardFormState>({
		defaultValues: {
			name: data.name,
			completed: data.completed,
			createdAt: data.createdAt,
			priority: data.priority,
      description: data.description
		}
	})

	useCardDebounce({ watch, cardId: data.id })

	// useEffect(() => {
	//   setDescription(data?.description || '');
	// }, [description]);

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
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


	return (
		<div className='flex flex-col items-start gap-x-3 w-full'>
				<div className=' w-full'>
          <div className='flex gap-x-3'>
					<AlignLeft className='h-5 w-5 mt-0.5 text-neutral-700' />
					<p className='font-semibold text-neutral-700 mb-2'>Description</p>
          </div>
      <TransparentFieldTextarea {...register('description')} />
				</div>
      <div>
        <div className='flex gap-x-3'>
          <AlertCircle/>
			<p className='font-semibold text-neutral-700 mb-2'>Priority</p>
        </div>
        </div>
		</div>
	)
}

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className='flex items-start gap-x-3 w-full'>
			<Skeleton className='h-6 w-6 bg-neutral-200' />
			<div className='w-full'>
				<Skeleton className='w-24 h-6 mb-2 bg-neutral-200' />
				<Skeleton className='w-full h-[78px] bg-neutral-200' />
			</div>
		</div>
	)
}
