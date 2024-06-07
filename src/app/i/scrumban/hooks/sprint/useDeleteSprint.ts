import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { sprintService } from '@/services/sprint.service'

export function useDeleteSprint() {
	const queryClient = useQueryClient()

	const { mutate: deleteSprint, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete sprint'],
		mutationFn: (id: string) => sprintService.deleteSprint(id),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['sprints'] }),
					queryClient.invalidateQueries({ queryKey: ['list'] }),
					queryClient.invalidateQueries({ queryKey: ['board'] }),

					toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		}
	})

	return { deleteSprint, isDeletePending }
}
