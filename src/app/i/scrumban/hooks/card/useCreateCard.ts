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
					name: string | undefined
					list: string | undefined
				}) => cardService.createCard({ name, list  }),
				onSuccess: data => {
					toast.success(`card "${data.data.name}" created`)
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

	return { createCard }
}
