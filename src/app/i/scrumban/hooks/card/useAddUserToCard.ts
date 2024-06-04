import { cardService } from '@/services/card.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

export function useAddUserToCard(){
	const queryClient = useQueryClient()


	const { mutate: addUserToCard, isPending } = useMutation(
		{
			mutationKey: ['add user'],
			mutationFn: ({
				email,
				boardId,
				cardId
			}: {
				email: string
				boardId: string
				cardId: string
			}) => cardService.addUserToCard({ email, boardId, cardId }),
			onSuccess: data => {
				toast.success(`User "${data.data[1].name}" added`)
				queryClient.invalidateQueries({queryKey:['list']})
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
		}
	)

	return{addUserToCard, isPending}
}