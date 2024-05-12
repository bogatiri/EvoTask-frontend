import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ISprintResponse } from '@/types/sprint.types'

import { sprintService } from '@/services/sprint.service'

export function useSprints(boardId: string) {
	const { data } = useQuery({
		queryKey: ['sprints'],
		queryFn: () => sprintService.getSprintsByBoardId(boardId)
	})

	const [items, setItems] = useState<ISprintResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}

export function useSprintById(sprintId: string, options = { enabled: true }) {
  const { data: sprint, isLoading, error,   } = useQuery<ISprintResponse>({
    queryKey: ['sprint', sprintId], 
    queryFn: () => sprintService.getSprintBySprintId(sprintId),
		enabled: options.enabled 
  })

  return { sprint, isLoading, error }
}
