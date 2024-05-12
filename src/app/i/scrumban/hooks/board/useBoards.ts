import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IBoardResponse } from '@/types/board.types'

import { boardService } from '@/services/board.service'

export function useBoards() {
	const { data } = useQuery({
		queryKey: ['boards'],
		queryFn: () => boardService.getBoards()
	})

	const [items, setItems] = useState<IBoardResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])
	return { items, setItems }
}

export function useBoardById(boardId: string) {
  const { data: board, isLoading, error,   } = useQuery<IBoardResponse>({
    queryKey: ['board', boardId], 
    queryFn: () => boardService.getBoardById(boardId) 
  })
  return { board, isLoading, error }
}
