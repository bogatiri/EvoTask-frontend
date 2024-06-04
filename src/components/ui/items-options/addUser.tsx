import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { useAddUserToBoard } from '../../../app/i/scrumban/hooks/board/useAddUserToBoard'
import { useAddUserToCard } from '../../../app/i/scrumban/hooks/card/useAddUserToCard'

interface IAddUserProps {
	boardId: string
	cardId?: string
}

const AddUser = ({ boardId, cardId }: IAddUserProps) => {
	const [email, setEmail] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const { addUserToCard } = useAddUserToCard()
	const { addUserToBoard } = useAddUserToBoard()

	const onAddUser = () => {
		if (cardId) {
			addUserToCard({ email, boardId, cardId })
		} else {
			addUserToBoard({ email, boardId })
		}
		setEmail('')
	}

	return (
		<DialogFooter className='sm:justify-start w-full flex gap-3 justify-between'>
			<Input
				className='w-full'
				placeholder='write an email of user that you want to add'
				onChange={handleInputChange}
				value={email}
				type='email'
				onKeyDown={e => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault()
						onAddUser
					}
				}}
			/>
			<Button
				variant='outline'
				onClick={onAddUser}
			>
				Add
			</Button>
		</DialogFooter>
	)
}

export default AddUser
