import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { commentService } from '@/services/comment.service'
import { isAxiosError } from 'axios'

export function useCreateComment() {
	const queryClient = useQueryClient()

		const { mutate: createComment, isPending } = useMutation(
			{
				mutationKey: ['create comment'],
				mutationFn: ({
					text,
					cardId,
				}: {
					text: string,
					cardId: string
				}) => commentService.createComment({text, cardId  }),
				onSuccess: data => {
					queryClient.invalidateQueries({
						queryKey: ['create comment']
					})
					toast.success(`Comment created`)
					queryClient.invalidateQueries({queryKey:['list']})
					queryClient.invalidateQueries({queryKey:['sprint']})
				},
				onError(error: unknown) {
					if (isAxiosError(error)) {
						const message = error.response?.data?.message || 'An error occurred'
						toast.error(message)
					} else {
						toast.error('An error occurred')
					}
				}
			}
		)

	return { createComment }
}
