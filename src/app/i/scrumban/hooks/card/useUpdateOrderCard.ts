import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { ICardResponse } from '@/types/card.types'

import { cardService } from '@/services/card.service'

interface ICardOrderUpdate {
	id: string
	order: number
}

export function useUpdateOrderCard() {
	const queryClient = useQueryClient()

	const { mutate: updateOrderCard, isPending } = useMutation({
		mutationKey: ['update order card'],
		mutationFn: (reorderedCards: ICardResponse[]) =>
			cardService.updateOrder(reorderedCards),
		onSuccess: data => {
			toast.success(`Card reordered`)
			queryClient.invalidateQueries({ queryKey: ['sprint'] })
			queryClient.invalidateQueries({ queryKey: ['list'] })
			queryClient.invalidateQueries({ queryKey: ['board'] })

		},
		onError(error: unknown) {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message || 'An error occurred'
				toast.error(message)
			} else {
				toast.error('An error occurred')
			}
		}
	})
	return { updateOrderCard, isPending }
}
