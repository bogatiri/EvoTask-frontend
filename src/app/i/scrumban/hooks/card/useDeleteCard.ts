import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cardService } from '@/services/card.service'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

export function useDeleteCard() {
	const queryClient = useQueryClient()

	const { mutate: deleteCard, isPending: isDeletePending } = useMutation(
		{
			mutationKey: ['delete card'],
			mutationFn: (id: string) => cardService.deleteCard(id),
			onSuccess: data => {
				toast.success(`Card "${data.data.name}" deleted`)
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

	return { deleteCard, isDeletePending }
}
