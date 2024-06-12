import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeCardUpdateFormState } from '@/types/card.types'

import { useCreateCard } from './useCreateCard'
import { useUpdateCard } from './useUpdateCard'

interface IUseCardDebounce {
	watch: UseFormWatch<TypeCardUpdateFormState>
	cardId: string
}

export function useCardDebounce({ watch, cardId }: IUseCardDebounce) {
	const { createCard } = useCreateCard()
	const { updateCard } = useUpdateCard()


	// Теперь debouncedUpdateCard будет сохраняться между рендерами, и debounce будет работать как ожидается.
	const debouncedUpdateCard = useCallback(
		debounce((formData: TypeCardUpdateFormState) => {

			updateCard({ id: cardId, data: formData })
		}, 1500),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (cardId) {
				debouncedUpdateCard({
					...formData,
					priority: formData.priority || undefined
				})
			} else {
			
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateCard, ])
}
