import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeListFormState } from '@/types/list.types'

import { listService } from '@/services/list.service'

export function useUpdateList(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateList } = useMutation({
		mutationKey: ['update list', key],
		mutationFn: ({ id, data }: { id: string; data: TypeListFormState }) =>
			listService.updateList(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['lists']
			})
		}
	})

	return { updateList }
}
