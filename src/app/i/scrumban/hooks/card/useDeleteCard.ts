import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cardService } from '@/services/card.service'

export function useDeleteCard() {
	const queryClient = useQueryClient()

	const { mutate: deleteCard, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete card'],
		mutationFn: (id: string) => cardService.deleteCard(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['cards']
			})
		}
	})

	return { deleteCard, isDeletePending }
}
