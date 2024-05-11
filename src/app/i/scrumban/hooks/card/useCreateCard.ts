import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/services/card.service'
import { isAxiosError } from 'axios'

export function useCreateCard() {
	const queryClient = useQueryClient()

		const { mutate: createCard, isPending } = useMutation(
			{
				mutationKey: ['create card'],
				mutationFn: ({
					name,
					list,
				}: {
					name: string
					list: string
				}) => cardService.createCard({ name, list  }),
				onSuccess: data => {
					queryClient.invalidateQueries({
						queryKey: ['create card']
					})
					toast.success(`User "${data.data.name}" added`)
					queryClient.invalidateQueries({queryKey:['list']})
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

	return { createCard }
}
