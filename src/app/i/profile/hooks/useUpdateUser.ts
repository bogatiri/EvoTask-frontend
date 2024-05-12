import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeUserFormState } from '@/types/auth.types'

import { userService } from '@/services/user.service'
import { toast } from 'sonner'

export function useUpdateUser() {
	const queryClient = useQueryClient()

	const { mutate: updateUser } = useMutation({
		mutationKey: ['update user'],
		mutationFn: ({ data }: {data: TypeUserFormState }) =>
			userService.update(data),
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ['user']
			}),
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('User updated')
		},
		onError(error){
			console.error(error)
		}
	})

	return { updateUser }
}
