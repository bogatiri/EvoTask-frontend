import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ICardResponse } from '@/types/card.types'

import { cardService } from '@/services/card.service'

export function useCards() {
	const { data } = useQuery({
		queryKey: ['cards'],
		queryFn: () => cardService.getCards()
	})

	const [items, setItems] = useState<ICardResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}

export function useCardById(id: string, options = { enabled: true }) {
  const { data: card, isLoading, error } = useQuery<ICardResponse[]>({
    queryKey: ['card', id], 
    queryFn: () => cardService.getCardById(id),
		enabled: options.enabled 
  })

  return { card, isLoading, error }
}