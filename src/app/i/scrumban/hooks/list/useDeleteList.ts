import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { listService } from '@/services/list.service'

export function useDeleteList() {
	const queryClient = useQueryClient()

	const { mutate: deleteList, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete list'],
		mutationFn: (id: string) => listService.deleteList(id),
		onSuccess: data => {
			toast.success(`List "${data.data.name}" deleted`)
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

	return { deleteList, isDeletePending }
}
