import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useProfile() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile()
	})

	return { data, isLoading, isSuccess }
}

export function getAvatar(avatar: string) {
	const {data: image, isLoading, isSuccess} = useQuery({
		queryKey: ['avatar'],
		queryFn: () => userService.getAvatar(avatar)
	})


	return {image, isLoading}
}