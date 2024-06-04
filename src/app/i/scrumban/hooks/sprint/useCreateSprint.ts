import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { sprintService } from '@/services/sprint.service'
import { isAxiosError } from 'axios'
import { ISprintResponse, TypeSprintFormState } from '@/types/sprint.types'

export function useCreateSprint() {
	const queryClient = useQueryClient()

		const { mutate: createSprint, isPending } = useMutation(
			{
				mutationKey: ['create sprint'],
				mutationFn: ({boardId} : {boardId: string}) => sprintService.createSprint({boardId}),
				onSuccess: data => {
					toast.success(`sprint created`)
					queryClient.invalidateQueries({queryKey:['list']})
					queryClient.invalidateQueries({queryKey:['board', data.sprint.boardId]})

				},
				onError(error: unknown) {
					if (isAxiosError(error)) {
						const message = error.response?.data?.message || 'An error occurred'
						toast.error(message)
					} else {
						toast.error('An error occurred')
					}
				}
			}
		)

	return { createSprint }
}
