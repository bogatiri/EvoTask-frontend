import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeCardFormState } from '@/types/card.types'

import { cardService } from '@/services/card.service'

export function useUpdateCard() {
	const queryClient = useQueryClient()

	const { mutate: updateCard } = useMutation({
		mutationKey: ['update card'],
		mutationFn: ({ id, data }: { id: string; data: TypeCardFormState }) =>
			cardService.updateCard(id, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['sprint'] })
			queryClient.invalidateQueries({ queryKey: ['list'] })
			queryClient.invalidateQueries({queryKey: ['cards']})
		}
	})

	return { updateCard }
}
