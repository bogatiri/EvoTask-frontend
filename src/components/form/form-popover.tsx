'use client'

import { X } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import { FormInput } from './form-input'
import { FormPicker } from './form-picker'
import { FormSubmit } from './form-submit'
import { useCreateBoard } from '@/app/i/scrumban/hooks/board/useCreateBoard'

interface FormPopoverProps {
	children: React.ReactNode
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
	isPicked: boolean
	pickImage: () => void
}

export const FormPopover = ({
	children,
	side = 'bottom',
	align,
	isPicked,
	pickImage,
	sideOffset = 0
}: FormPopoverProps) => {
	const closeRef = useRef<ElementRef<'button'>>(null)


	const { createBoard } = useCreateBoard()

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const image = formData.get('image') as string
		const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
			image.split('|')
		const name = title
		createBoard({
			name,
			imageId,
			imageThumbUrl,
			imageFullUrl,
			imageLinkHTML,
			imageUserName
		})
		closeRef.current?.click()
	}

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align={align}
				className='pt-3 w-[100vw] md:w-[444px]'
				side={side}
				sideOffset={sideOffset}
			>
				<div className='text-md font-medium text-center text-white pb-4'>
					Create board
				</div>
				<PopoverClose
					ref={closeRef}
					asChild
				>
					<Button
						className='h-auto w-auto p-2 absolute top-2 right-2 text-white'
						variant='ghost'
					>
						<X className='h-5 w-5' />
					</Button>
				</PopoverClose>
				<form
					action={onSubmit}
					className='space-y-4'
				>
					<div
						className='space-y-4'
					>
						<FormPicker
							pickImage={pickImage}
							id='image'
						/>
						<FormInput
							id='title'
							label='Board title'
							type='text'
						/>
					</div>
					{isPicked ? (
						<FormSubmit className='w-full text-base'>Create</FormSubmit>
					) : (
						<div className='text-center'>Need to pick some background</div>
					)}
				</form>
			</PopoverContent>
		</Popover>
	)
}
