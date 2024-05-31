import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeCardFormState, TypeCardUpdateFormState } from '@/types/card.types'

import { useCreateCard } from './useCreateComment'
import { useUpdateCard } from './useUpdateCard'

interface IUseCardDebounce {
	watch: UseFormWatch<TypeCardUpdateFormState>
	cardId: string
}

export function useCardDebounce({ watch, cardId }: IUseCardDebounce) {
	const { createCard } = useCreateCard()
	const { updateCard } = useUpdateCard()

	const debouncedCreateCard = useCallback(
		debounce((formData: TypeCardUpdateFormState) => {
			createCard(formData)
		}, 444),
		[]
	)

	// Теперь debouncedUpdateCard будет сохраняться между рендерами, и debounce будет работать как ожидается.
	const debouncedUpdateCard = useCallback(
		debounce((formData: TypeCardUpdateFormState) => {
			updateCard({ id: cardId, data: formData })
		}, 444),
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
				debouncedCreateCard(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateCard, debouncedCreateCard])
}
