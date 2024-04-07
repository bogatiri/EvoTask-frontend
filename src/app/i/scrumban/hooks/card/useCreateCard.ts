import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeCardFormState } from '@/types/card.types'

import { cardService } from '@/services/card.service'

export function useCreateCard() {
	const queryClient = useQueryClient()

	const { mutate: createCard } = useMutation({
		mutationKey: ['create card'],
		mutationFn: (data: TypeCardFormState) => cardService.createCard(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['cards']
			}),
				toast.success('Card created successfully')
		},
		onError() {
			toast.error('Error creating card')
		}
	})

	return { createCard }
}
