import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { cardService } from '@/services/card.service'

export function usePickCard() {
	const queryClient = useQueryClient()

	const { mutate: pickCard, isPending } = useMutation({
		mutationKey: ['copy card'],
		mutationFn: ({ cardId }: { cardId: string }) =>
			cardService.pickCard({ cardId }),
		onSuccess: data => {
			toast.success(`Card "${data.data.name}" picked`)
			queryClient.invalidateQueries({ queryKey: ['list'] })
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
	return { pickCard, isPending }
}
