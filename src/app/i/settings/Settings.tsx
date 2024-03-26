'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Buttons/Button'
import { Field } from '@/components/ui/Fields/Field'

import { TypeUserForm } from '@/types/auth.types'

import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

const Settings = () => {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div>
			<form
				className='w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10 sm:grid-cols-1'>
					<div>
						<Field
							id='email'
							label='Email: '
							placeholder='Enter email'
							{...register('email', {
								required: 'Email is required!'
							})}
							extra='mb-4'
						/>
						<Field
							id='name'
							label='Name: '
							placeholder='Enter name'
							{...register('name')}
							extra='mb-4'
						/>
						{/* <Field
							id='about'
							label='About: '
							placeholder='Enter about'
							{...register('about')}
							extra='mb-4'
						/> */}
						<Field
							id='password'
							label='Password: '
							placeholder='Enter password'
							{...register('password')}
							extra='mb-10'
						/>
					</div>
					<div>
						<Field
							id='workInterval'
							label='WorkInterval: '
							placeholder='Enter workInterval'
							{...register('workInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>
						<Field
							id='breakInterval'
							label='BreakInterval: '
							placeholder='Enter breakInterval'
							{...register('breakInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>
						<Field
							id='intervalsCount'
							label='IntervalsCount: '
							placeholder='Enter intervalsCount'
							{...register('intervalsCount', {
								valueAsNumber: true
							})}
							extra='mb-6'
						/>
					</div>
				</div>
				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}

export default Settings
