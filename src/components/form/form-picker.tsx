'use client'

import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { defaultImages } from '@/constants/images'

import { FormErrors } from './form-errors'
import { cn } from '@/lib/utils'

interface FormPickerProps {
	id: string
	errors?: Record<string, string[] | undefined>
	pickImage: () => void
}

export const FormPicker = ({ id, errors, pickImage }: FormPickerProps) => {
	const { pending } = useFormStatus()

	const [images, setImages] =
		useState<Array<Record<string, any>>>(defaultImages)
	const [isLoading, setIsLoading] = useState(true)
	const [selectedImageId, setSelectedImageId] = useState(null)

	

	if (isLoading) {
    setIsLoading(false)
		return (
			<div className='p-6 flex items-center justify-center'>
				<Loader2 className='h-6 w-6 text-sky-700 animate-spin' />
			</div>
		)
	}

	return (
		<div className='relative'>
			<div className='grid  grid-cols-4 gap-2 mb-2'>
				{images.map(image => (
					<div
						key={image.id}
						className={cn(
							'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
							pending && 'opacity-50 hover:opacity-50 cursor-auto'
						)}
						onClick={() => {
							if (pending) return
							setSelectedImageId(image.id)
							pickImage()
						}}
					>
						<input
							type='radio'
							id={id}
							name={id}
							className='hidden'
							checked={selectedImageId === image.id}
							onChange={() => {}}
							disabled={pending}
							defaultValue={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
						/>
						<Image
							src={image.urls.thumb}
							alt='Unsplash image'
							className='object-cover rounded-sm'
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
						{selectedImageId === image.id && (
							<div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
								<Check className='h-4 w-4 ' />
							</div>
						)}
						<Link
							href={image.links.html}
							target='_blank'
							className='opacity-0 hidden md:block group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate  hover:underline p-1 bg-black/50'
						>
							{image.user.name}
						</Link>
					</div>
				))}
			</div>
			<FormErrors
				id='image'
				errors={errors}
			/>
		</div>
	)
}
