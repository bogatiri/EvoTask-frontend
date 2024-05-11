import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IChatResponse } from '@/types/chat.types'

import { chatService } from '@/services/chat.service'

export function useChats() {
	const { data } = useQuery({
		queryKey: ['chats'],
		queryFn: () => chatService.getChats()
	})

	const [items, setItems] = useState<IChatResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}

export function useChatById(chatId: string) {
  const { data: chat, isLoading, error,   } = useQuery<IChatResponse>({
    queryKey: ['chat', chatId], 
    queryFn: () => chatService.getChatById(chatId) 
  })

  return { chat, isLoading, error }
}
