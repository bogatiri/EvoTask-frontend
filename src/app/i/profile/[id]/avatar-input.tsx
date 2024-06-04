import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {

	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,

} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { TransparentFieldTextarea } from '@/components/ui/fields/TransparentFieldTextarea'
import { useSetAvatar } from '../hooks/useSetAvatar'
import { useState } from 'react'

interface IAvatarInputProps{
	currentUser: string
}

const AvatarInput = ({currentUser}: IAvatarInputProps) => {
	const [file, setUserAvatar] = useState<File>()

	const { setAvatar } = useSetAvatar()

	const onAvatarSet = () => {
		const id = currentUser
		if (file) setAvatar({ id, file })
	}


	return (
		<DialogContent>
		<DialogHeader>
			<DialogTitle>Avatar</DialogTitle>
			<DialogDescription>
				You can choose a picture
			</DialogDescription>
		</DialogHeader>
		<span>Choose a picture picture:</span>
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