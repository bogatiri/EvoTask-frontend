import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeSprintFormState } from '@/types/sprint.types'

import { sprintService } from '@/services/sprint.service'

export function useUpdateSprint(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateSprint } = useMutation({
		mutationKey: ['update sprint', key],
		mutationFn: ({ id, data }: { id: string; data: TypeSprintFormState }) =>
			sprintService.updateSprint(id, data),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['sprint', key] }),
				queryClient.invalidateQueries({ queryKey: ['board' ] }),
					toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		},
		onError: data => {
			toast.error(data.message)
		}
	})

	return { updateSprint }
}
