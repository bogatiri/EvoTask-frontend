import { usePathname } from 'next/navigation'

import { useBoardById } from './useSprints'

export const useBoardId = () => {
	const pathname = usePathname()
	const id = pathname.split('/')[4]
	const { board, isLoading, error } = useBoardById(id)
	return { board, isLoading, error }
}
