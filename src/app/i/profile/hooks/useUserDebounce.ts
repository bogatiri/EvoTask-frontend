import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeUserForm, TypeUserFormState } from '@/types/auth.types'

import { useUpdateUser } from './useUpdateUser'

interface IUseUserDebounce {
	watch: UseFormWatch<TypeUserForm>
}

export function useUserDebounce({ watch }: IUseUserDebounce) {
	const { updateUser } = useUpdateUser()

	const debouncedUpdateUser = useCallback(
		debounce((formData: TypeUserFormState) => {
			updateUser({ data: formData })
		}, 1000),
		[updateUser]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			debouncedUpdateUser({
				...formData
			})
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateUser])
}
