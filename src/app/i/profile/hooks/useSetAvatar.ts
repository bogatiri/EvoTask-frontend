import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeUserFormState } from '@/types/auth.types'

import { userService } from '@/services/user.service'
import { toast } from 'sonner'

export function useSetAvatar() {
	const queryClient = useQueryClient()

	const { mutate: setAvatar } = useMutation({
		mutationKey: ['set avatar'],
		mutationFn: ({ id, file }: { id: string; file: File }) =>
			userService.setAvatar({ id, file }),
		onSuccess(data) {
			queryClient.invalidateQueries({queryKey: ['user']}),
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('User updated')
		},
		onError(error){
			console.error('qweasd',error)
		}
	})

	return { setAvatar }
}
