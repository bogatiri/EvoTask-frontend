import { MessageSquareText, SendHorizonal } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

import { ICardResponse } from '@/types/card.types'

import { useCreateComment } from '../../../app/i/scrumban/hooks/comment/useCreateComment'

interface ICommentsProps {
	data: ICardResponse
}

const Comments = ({ data }: ICommentsProps) => {
	const [comment, setComment] = useState('')

	const formatDate = (isoString: string) => {
		const date = new Date(isoString)

		date.setHours(date.getHours())

		return date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})
	}

	const handleInputCommentChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setComment(event.target.value)
	}

	const { createComment } = useCreateComment()

	const onCreateComment = () => {
		const cardId = data?.id
		const text = comment
		createComment({ text, cardId })
		setComment('')
	}

	return (
		<div className='flex  flex-col flex-grow justify-between'>
			<div>
				<div className='flex gap-x-3'>
					<MessageSquareText className='h-5 w-5 mt-0.5 text-neutral-700' />
					<p className='font-semibold text-neutral-700 mb-2'>Comments</p>
				</div>
				<ul className='border border-border rounded-md space-y-2 h-32 max-h-32 md:h-48 overflow-y-auto flex flex-col p-1 md:p-4'>
					{data.comments ? (
						data.comments.map((comment, index) => (
							<div
								className='flex gap-1 md:gap-2'
								key={index}
							>
								<div className='flex items-center'>
									{comment.user.avatar ? (
										<Link
										className=''
										href={`/i/profile/${comment.user.id}`}>
											<Avatar className='size-5 md:size-8  border border-border'>
												<AvatarImage src={comment.user.avatar}></AvatarImage>
											</Avatar>
										</Link>
									) : (
										<Link href={`/i/profile/${comment.user.id}`}>
											<Avatar className='size-5 md:size-8 border border-border'>
												<AvatarFallback>
													{comment.user.name
														? comment.user.name.charAt(0).toUpperCase()
														: comment.user.email.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
										</Link>
									)}
								</div>
								<div className='rounded-lg px-4 py-2 max-w-xs mr-auto  text-white bg-gray-900'>
									<div className='flex gap-1 md:gap-2'>
										<span className='block break-words max-w-[200px] text-sm'>
											{comment.text}
										</span>
										<span className='text-xs text-right text-gray-600 self-end'>
											{formatDate(comment.createdAt)}
										</span>
									</div>
								</div>
							</div>
						))
					) : (
						<p>No Comments</p>
					)}
				</ul>
			</div>
			<div className='flex gap-2 w-full justify-between mt-2 mb-2'>
				<div className='w-full'>
					<Input
						value={comment}
						className='w-full'
						onChange={handleInputCommentChange}
						onKeyDown={e => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault()
								onCreateComment()
							}
						}}
					/>
				</div>
				<div
					className='opacity-70 hover:opacity-100 cursor-pointer hover:bg-blueSecondary rounded-md p-2'
					onClick={onCreateComment}
				>
					<SendHorizonal />
				</div>
			</div>
		</div>
	)
}

export default Comments
