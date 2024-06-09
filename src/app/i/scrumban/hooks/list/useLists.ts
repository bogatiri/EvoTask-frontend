import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IListResponse } from '@/types/list.types'

import { listService } from '@/services/list.service'

export function useLists() {
	const { data } = useQuery({
		queryKey: ['lists'],
		queryFn: () => listService.getLists()
	})

	const [items, setItems] = useState<IListResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}

export function useListById(boardId: string, options = { enabled: true }) {
  const { data: list, isLoading, error } = useQuery<IListResponse[]>({
    queryKey: ['list', boardId], 
    queryFn: () => listService.getListById(boardId),
		enabled: options.enabled,
  },
)

  return { list, isLoading, error }
}

export function getListBySprintId(sprintId: string) {
  const { data: list, isLoading, error } = useQuery<IListResponse[]>({
    queryKey: ['list', sprintId], 
    queryFn: () => listService.getListById(sprintId),
  },
)

  return { list, isLoading, error }
}