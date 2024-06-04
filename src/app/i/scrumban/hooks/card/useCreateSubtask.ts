import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/services/card.service'
import { isAxiosError } from 'axios'

export function useCreateSubtask() {
	const queryClient = useQueryClient()

		const { mutate: createSubtask, isPending } = useMutation(
			{
				mutationKey: ['create card'],
				mutationFn: ({
					name,
					parentId,
				}: {
					name: string
					parentId: string
				}) => cardService.createSubtask({ name, parentId  }),
				onSuccess: data => {
					toast.success(`subtask "${data.data.name}" added`)
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

	return { createSubtask }
}
