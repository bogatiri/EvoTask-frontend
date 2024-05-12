import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ISprintResponse, TypeSprintFormState } from '@/types/sprint.types'

import { sprintService } from '@/services/sprint.service'
import { toast } from 'sonner'

export function useUpdateSprint(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateSprint } = useMutation({
		mutationKey: ['update sprint', key],
		mutationFn: ({ id, data }: { id: string; data: TypeSprintFormState }) =>
			sprintService.updateSprint(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['sprints']
			}),
			toast.success(`Sprint Updated Successfully`)

		}
	})

	return { updateSprint }
}
