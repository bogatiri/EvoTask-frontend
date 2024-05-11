import { boardService } from '@/services/board.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

export function useAddUserToBoard(){
	const queryClient = useQueryClient()


	const { mutate: addUserToBoard, isPending } = useMutation(
		{
			mutationKey: ['add user'],
			mutationFn: ({
				email,
				boardId
			}: {
				email: string
				boardId: string
			}) => boardService.addUserToBoard({ email, boardId }),
			onSuccess: data => {
				queryClient.invalidateQueries({
					queryKey: ['add user to board']
				})
				toast.success(`User "${data.data[1].name}" added`)
				queryClient.invalidateQueries({queryKey:['board']})
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

	return{addUserToBoard, isPending}
}