'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/buttons/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Field } from '@/components/ui/fields/Field'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/input-otp'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	// const [isOpen, setIsOpen] = useState(false)
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	const [isLoginForm, setIsLoginForm] = useState(false)
	const [code, setCode] = useState('')
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['check-code'],
		mutationFn: ({
			email,
			code,
			data
		}: {
			email: string
			code: string
			data: IAuthForm
		}) => authService.confirmCode(email, code, data),
		onSuccess: (response, variables) => {
			auth(variables.data)
		},
		onError (error) {
			toast.error('Invalid confirmation code or password')
		}
	})

	const { mutate: auth } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess: data => {
			localStorage.setItem('authToken', data!.data!.accessToken!)
			localStorage.setItem('userId', data!.data.user.id.toString())
			toast.success('Successfully login!'), reset(), push(DASHBOARD_PAGES.SCRUMBAN)
		}
	})

	const { mutate: sendCode } = useMutation({
		mutationKey: ['send-code'],
		mutationFn: (data: IAuthForm) => authService.sendConfirmationCode(data),
		onSuccess: data => {
			if (data.message){
				toast.success(data.message)
			} else {
				setStage('codeSent')
				toast.success('Confirmation code sent! Check your email.')
			}
		},
		onError: data =>  {
			if (data.message.includes('valid')){
				toast.success(data.message)
			}
			toast.error('Failed to send confirmation code.')
		}
	})

	const [stage, setStage] = useState('initial') // 'initial', 'codeSent', 'verified'

	// const handleRegister = (data: IAuthForm) => {
	// 	setIsOpen(true)
	// 	sendCode(data)
	// 	setIsLoginForm(false)
	// }

	const handleLogin = (data: IAuthForm) => {
		setIsLoginOpen(true)
		sendCode(data)
		setIsLoginForm(true)
	}

	const handleConfirmCode: SubmitHandler<IAuthForm> = data => {
		mutate({ email: data.email, code, data })
	}

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		auth(data)
	}

	return (
		<div className='flex min-h-screen'>
			<form
				className='min-w-[25%] m-auto shadow bg-sidebar border-border border rounded-xl p-layout'
				// onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Auth' />

				<Field
					id='email'
					label='Email:'
					placeholder='Enter email:'
					type='email'
					extra='mb-4'
					{...register('email', {
						required: 'Email is required!'
					})}
				/>

				<Field
					id='password'
					label='Password: '
					placeholder='Enter password: '
					type='password'
					{...register('password', {
						required: 'Password is required!'
					})}
					extra='mb-6'
				/>

				<div className='flex items-center gap-5 justify-center'>
					<Dialog
						open={isLoginOpen}
						onOpenChange={setIsLoginOpen}
					>
						<DialogTrigger>
							<div
								className='linear rounded-lg bg-transparent border border-primary py-2 px-7 text-base font-medium text-white transition hover:bg-primary active:bg-brand-700'
								onClick={handleSubmit(handleLogin)}
							>
								Login
							</div>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Write the confirmation code</DialogTitle>
							</DialogHeader>
							<div className='flex justify-center items-center'>
								<InputOTP
									maxLength={6}
									value={code}
									onChange={code => setCode(code)}
									onKeyDown={e => {
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault()
											handleSubmit(handleConfirmCode)
										}
									}}
								>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</div>
							<Button onClick={handleSubmit(handleConfirmCode)}>Login</Button>
						</DialogContent>
					</Dialog>
					<div
						className='linear rounded-lg bg-transparent border border-primary py-2 px-7 text-base font-medium text-white transition hover:bg-primary active:bg-brand-700 cursor-pointer'
						onClick={handleSubmit(onSubmit)}
					>
						Register
					</div>
				</div>
			</form>
		</div>
	)
}
