import { useMutation, useQueryClient } from '@tanstack/react-query'

import { listService } from '@/services/list.service'

export function useDeleteList() {
	const queryClient = useQueryClient()

	const { mutate: deleteList, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete list'],
		mutationFn: (id: string) => listService.deleteList(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['lists']
			})
		}
	})

	return { deleteList, isDeletePending }
}
