import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { listService } from '@/services/list.service'

export function useCreateList() {
	const queryClient = useQueryClient()

	const { mutate: createList, isPending } = useMutation({
		mutationKey: ['create list'],
		mutationFn: ({ name, board, sprintId }: { name: string; board: string, sprintId?: string }) =>
			listService.createList({ name, board, sprintId }),
		onSuccess: data => {
			toast.success(`List "${data.data.name}" created`)
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

	return { createList }
}
