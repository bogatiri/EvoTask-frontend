import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeListFormState } from '@/types/list.types'

import { useCreateList } from './useCreateList'
import { useUpdateList } from './useUpdateList'

interface IUseListDebounce {
	watch: UseFormWatch<TypeListFormState>
	itemId: string
}

export function useListDebounce({ watch, itemId }: IUseListDebounce) {
	const { createList } = useCreateList()
	const { updateList } = useUpdateList()

	const debouncedCreateList = useCallback(
		debounce((formData: TypeListFormState) => {
			createList(formData)
		}, 444),
		[]
	)

	// Теперь debouncedUpdateList будет сохраняться между рендерами, и debounce будет работать как ожидается.
	const debouncedUpdateList = useCallback(
		debounce((formData: TypeListFormState) => {
			updateList({ id: itemId, data: formData })
		}, 444),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debouncedUpdateList({
					...formData,
				})
			} else {
				debouncedCreateList(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateList, debouncedCreateList])
}
