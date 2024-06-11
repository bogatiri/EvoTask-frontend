import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { cardService } from '@/services/card.service'

export function useCopyCard() {
	const queryClient = useQueryClient()

	const { mutate: copyCard, isPending } = useMutation({
		mutationKey: ['copy card'],
		mutationFn: ({ cardId, listId }: { cardId: string; listId: string }) =>
			cardService.copyCard({ cardId, listId }),
		onSuccess: data => {
			toast.success(`Card "${data.data.name}" copied`)
			queryClient.invalidateQueries({ queryKey: ['list'] })
			queryClient.invalidateQueries({ queryKey: ['sprint'] })
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
	return { copyCard, isPending }
}
