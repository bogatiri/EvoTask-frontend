import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { listService } from '@/services/list.service'

export function useCopyList() {
	const queryClient = useQueryClient()

	const { mutate: copyList, isPending } = useMutation({
		mutationKey: ['copy list'],
		mutationFn: ({ listId, boardId }: { listId: string; boardId: string }) =>
			listService.copyList({ listId, boardId }),
		onSuccess: data => {
			toast.success(`List "${data.data.name}" copied`)
			queryClient.invalidateQueries({ queryKey: ['list'] })
			queryClient.invalidateQueries({ queryKey: ['sprint'] })
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
	return { copyList, isPending }
}
