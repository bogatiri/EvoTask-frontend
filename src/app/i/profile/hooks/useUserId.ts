import { usePathname } from 'next/navigation'
import { useUserById } from './useUser'

useUserById
export const useUserId = () => {
	const pathname = usePathname()
	const id = pathname.split('/')[3]
	const { user, isLoading, error } = useUserById(id)
	return { user, isLoading, error }
}
