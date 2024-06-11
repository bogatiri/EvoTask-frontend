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

import { AvatarPicker} from './avatar-picker'
import { useCreateBoard } from '@/app/i/scrumban/hooks/board/useCreateBoard'
import { useUpdateUser } from '../hooks/useUpdateUser'

interface FormPopoverProps {
	children: React.ReactNode
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
	isPicked: boolean
	pickImage: () => void
}

export const AvatarPopover = ({
	children,
	side = 'bottom',
	align,
	isPicked,
	pickImage,
	sideOffset 
}: FormPopoverProps) => {
	const closeRef = useRef<ElementRef<'button'>>(null)


const {updateUser} = useUpdateUser()

	const onSubmit = (formData: FormData) => {
		const image = formData.get('image') as string
		const [raw, imageThumbUrl, imageFullUrl, regular, small] =
			image.split('|')
		const avatar = regular
		updateUser({data:{avatar}})
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
				<div className='text-md font-medium text-center text-neutral-600 pb-4'>
					Choose a avatar
				</div>
				<PopoverClose
					ref={closeRef}
					asChild
				>
					<Button
						className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
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
						<AvatarPicker
							pickImage={pickImage}
							id='image'
						/>
					</div>
						<Button
						disabled={!isPicked}
						type='submit' variant='outline' className='w-full text-base'>Choose</Button>
				</form>
			</PopoverContent>
		</Popover>
	)
}
