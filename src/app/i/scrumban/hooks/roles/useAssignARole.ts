import { roleService } from '@/services/roles.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

export function useAssignARole(){
	const queryClient = useQueryClient()


	const { mutate: assignARole, isPending } = useMutation(
		{
			mutationKey: ['assign role'],
			mutationFn: ({
				userId,
				boardId,
				id
			}: {
				userId: string
				boardId: string,
				id: string
			}) => roleService.assignARole({ userId, boardId, id }),
			onSuccess: data => {
				toast.success(`User added`)
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

	return{assignARole, isPending}
}