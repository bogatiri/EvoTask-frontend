import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { listService } from '@/services/list.service'
import { IListResponse } from '@/types/list.types'

interface IListOrderUpdate {
	id: string
	order: number
}

export function useUpdateOrderList() {
	const queryClient = useQueryClient()

	const { mutate: updateOrderList, isPending } = useMutation({
		mutationKey: ['update order list'],
		mutationFn: ( reorderedLists: IListResponse[] ) =>
			listService.updateOrder(reorderedLists),
		onSuccess: data => {
			toast.success(`List reordered`)
			queryClient.invalidateQueries({ queryKey: ['list'] })
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
	return { updateOrderList, isPending }
}
