import { X } from 'lucide-react'
import { useState } from 'react'

import { FormPopover } from '@/components/form/form-popover'
import { Button } from '@/components/ui/button'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'

import { useSetAvatar } from '../hooks/useSetAvatar'
import { AvatarPopover } from './avatar-popover'

interface IAvatarInputProps {
	currentUser: string
}

const AvatarInput = ({ currentUser }: IAvatarInputProps) => {
	const [file, setUserAvatar] = useState<File>()
	const [isPicked, setIsPicked] = useState(false)

	const { setAvatar } = useSetAvatar()

	const onAvatarSet = () => {
		const id = currentUser
		if (file) setAvatar({ id, file })
	}


	const pickImage = () => {
		setIsPicked(true)
	}


	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Avatar</DialogTitle>
			</DialogHeader>
			<span>Choose a avatar</span>
			<div className='grid grid-cols-2'>

			<AvatarPopover
					sideOffset={-525}
					side='top'
					isPicked={isPicked}
					pickImage={pickImage}
				>
					<div
						role='button'
						className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
						onClick={() => setIsPicked(false)}
					>
						<p className='text-sm'>Choose a avatar</p>
					</div>
				</AvatarPopover>
					</div>
			<div className='flex justify-between gap-5'>
				<div className='flex gap-3'>
					<input
						id='fileInput'
						type='file'
						accept='image/jpeg,image/png,image/gif,image/heic,image/heif,image/webp'
						onChange={event => {
							if (event.target.files && event.target.files[0]) {
								setUserAvatar(event.target.files[0])
							}
						}}
						style={{ display: 'none' }} // Скрываем элемент инпута
					/>
					<label
						htmlFor='fileInput'
						className='flex items-center cursor-pointer h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background '
					>
						{file ? file.name : 'Загрузить изображение'}
					</label>
					{file && (
						<X
							className='cursor-pointer'
							onClick={() => setUserAvatar(undefined)}
						/>
					)}
				</div>
				<Button
					disabled={!file}
					variant='outline'
					onClick={onAvatarSet}
				>
					Set Avatar
				</Button>
			</div>
		</DialogContent>
	)
}

export default AvatarInput
