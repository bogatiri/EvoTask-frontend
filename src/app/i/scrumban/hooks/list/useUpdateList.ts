import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeListFormState } from '@/types/list.types'

import { listService } from '@/services/list.service'
import { toast } from 'sonner'

export function useUpdateList(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateList } = useMutation({
		mutationKey: ['update list'],
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
