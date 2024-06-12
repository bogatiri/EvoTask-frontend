import cn from 'clsx'
import { type TextareaHTMLAttributes, forwardRef } from 'react'

type TypeTransparentField = TextareaHTMLAttributes<HTMLTextAreaElement>

export const TransparentFieldTextarea = forwardRef<
	HTMLTextAreaElement,
	TypeTransparentField
>(({ className,placeholder, ...rest }, ref) => {
	return (
		<textarea
			placeholder={placeholder ? placeholder : 'You can add a description to your card...'}
			autoFocus={false}
			className={cn(
				'bg-transparent overflow-y-auto placeholder:opacity-45 resize-none  focus:outline-0 focus:shadow-transparent w-full min-h-[150px] rounded-md border border-border p-2',
				className
			)}
			ref={ref}
			{...rest}
		/>
	)
})

TransparentFieldTextarea.displayName = 'TransparentFieldTextarea'
