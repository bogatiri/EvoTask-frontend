import cn from 'clsx'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { useInputMask } from '@code-forge/react-input-mask';

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<
	HTMLInputElement,
	TypeTransparentField
>(({ className,type, ...rest }, ref) => {
	const { getInputProps } = useInputMask({ mask: '+7(999)-999-99-99' });

	return (
		<input
			autoComplete='off'
			autoFocus={false}
			className={cn(
				' bg-transparent  border-none focus:outline-0 focus:shadow-transparent w-full',
				className
			)}
			type={type}
			{...(type === 'tel' ? getInputProps() : {})}
			ref={ref}
			{...rest}
		/>
	)
})

TransparentField.displayName = 'TransparentField'
