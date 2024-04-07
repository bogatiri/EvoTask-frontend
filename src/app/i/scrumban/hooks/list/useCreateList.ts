import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeListFormState } from '@/types/list.types'

import { listService } from '@/services/list.service'

export function useCreateList() {
	const queryClient = useQueryClient()

	const { mutate: createList } = useMutation({
		mutationKey: ['create list'],
		mutationFn: (data: TypeListFormState) => listService.createList(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['lists']
			})
		}
	})

	return { createList }
}
