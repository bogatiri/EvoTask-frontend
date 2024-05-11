import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardService } from '@/services/board.service'
import { useRouter } from 'next/navigation'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { toast } from 'sonner'

export function useDeleteBoard() {
	const queryClient = useQueryClient()
	const { push } = useRouter()


	const { mutate: deleteBoard, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete board'],
		mutationFn: (id: string) => boardService.deleteBoard(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['boards'],
			}),
			toast.success('Successfully deleted!'),
			push(DASHBOARD_PAGES.SCRUMBAN);
			
		}
	})

	return { deleteBoard, isDeletePending }
}
