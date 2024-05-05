import cn from 'clsx'
import { type TextareaHTMLAttributes, forwardRef } from 'react'

type TypeTransparentField = TextareaHTMLAttributes<HTMLTextAreaElement>

export const TransparentFieldTextarea = forwardRef<
	HTMLTextAreaElement,
	TypeTransparentField
>(({ className, ...rest }, ref) => {
	return (
		<textarea
			placeholder='You can add a description to your card...'
			className={cn(
				'bg-transparent overflow-hidden placeholder:opacity-45 resize-none  focus:outline-0 focus:shadow-transparent w-full h-[150px] rounded-md border border-border p-2',
				className
			)}
			ref={ref}
			{...rest}
		/>
	)
})

TransparentFieldTextarea.displayName = 'TransparentFieldTextarea'
