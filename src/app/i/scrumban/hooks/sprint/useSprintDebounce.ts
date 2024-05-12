import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeSprintFormState } from '@/types/sprint.types'

import { useCreateSprint } from './useCreateSprint'
import { useUpdateSprint } from './useUpdateSprint'

interface IUseSprintDebounce {
	watch: UseFormWatch<TypeSprintFormState>
	sprintId: string
}

export function useSprintDebounce({ watch, sprintId }: IUseSprintDebounce) {
	const { updateSprint } = useUpdateSprint()

	// Теперь debouncedUpdateSprint будет сохраняться между рендерами, и debounce будет работать как ожидается.
	const debouncedUpdateSprint = useCallback(
		debounce((formData: TypeSprintFormState) => {
			updateSprint({ id: sprintId, data: formData })
		}, 444),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (sprintId) {
				debouncedUpdateSprint({
					...formData,
				})
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateSprint])
}
