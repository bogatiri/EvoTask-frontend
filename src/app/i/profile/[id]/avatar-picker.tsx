'use client'

import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { avatars } from '@/constants/avatars'

import { cn } from '@/lib/utils'

interface FormPickerProps {
	id: string
	errors?: Record<string, string[] | undefined>
	pickImage: () => void
}

export const AvatarPicker = ({ id, errors, pickImage }: FormPickerProps) => {
	const { pending } = useFormStatus()

	const [images, setImages] =
		useState<Array<Record<string, any>>>(avatars)
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
							defaultValue={`${image.urls.raw}|${image.urls.thumb}|${image.urls.full}|${image.urls.regular}|${image.urls.small_s3}`}
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
								<Check className='h-4 w-4 text-white' />
							</div>
						)}
					</div>
				))}
			</div>

		</div>
	)
}
