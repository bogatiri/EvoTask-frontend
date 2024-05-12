import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sprintService } from '@/services/sprint.service'
import { toast } from 'sonner'

export function useDeleteSprint() {
	const queryClient = useQueryClient()


	const { mutate: deleteSprint, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete sprint'],
		mutationFn: (id: string) => sprintService.deleteSprint(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['sprints'],
			}),
			queryClient.invalidateQueries({
				queryKey: ['list'],
			}),
			toast.success('Successfully deleted!')	
		}
	})

	return { deleteSprint, isDeletePending }
}
