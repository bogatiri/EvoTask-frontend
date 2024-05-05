import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeListFormState, TypeListUpdateFormState } from '@/types/list.types'

import { useCreateList } from './useCreateList'
import { useUpdateList } from './useUpdateList'

interface IUseListDebounce {
	watch: UseFormWatch<TypeListUpdateFormState>
	listId: string
}

export function useListDebounce({ watch, listId }: IUseListDebounce) {
	const { createList } = useCreateList()
	const { updateList } = useUpdateList()

	const debouncedCreateList = useCallback(
		debounce((formData: TypeListUpdateFormState) => {
			createList(formData)
		}, 444),
		[]
	)

	// Теперь debouncedUpdateList будет сохраняться между рендерами, и debounce будет работать как ожидается.
	const debouncedUpdateList = useCallback(
		debounce((formData: TypeListUpdateFormState) => {
			updateList({ id: listId, data: formData })
		}, 444),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (listId) {
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
