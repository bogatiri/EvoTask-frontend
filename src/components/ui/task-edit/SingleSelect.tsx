import cn from 'clsx'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'

import { useOutside } from '@/hooks/useOutside'

export interface IOption {
	label: string
	value: string
}

interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
	text?: string
}

export function SingleSelect({
	data,
	onChange,
	value,
	text,
	isColorSelect
}: ISingleSelect) {
	const { isShow, setIsShow, ref } = useOutside(false)
	const getValue = () => data.find(item => item.value === value)?.value

	return (
		<div
			className={cn('relative cursor-pointer ', {
				'w-max': isColorSelect
			})}
			ref={ref}
		>
			<div
			className='flex left-0'
				onClick={e => {
					e.preventDefault()
					setIsShow(!isShow)
					e.stopPropagation()
				}}
			>
				{getValue() ? (
					<Badge
						variant={value}
						className='capitalize'
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : text ? 
				(
					<Badge>{text}</Badge>
				) : <Badge>Click for select</Badge>}
			</div>
			{isShow && (
				<div
					className={cn(
						'absolute md:flex md:flex-row md:gap-1 w-full md:bottom-4 p-2.5   md:right-3 slide bg-sidebar z-10 shadow rounded-lg'
					)}

				>
					{data.map(item => (
						<div
							key={item.value}
							onClick={e => {
								e.preventDefault()
								onChange(item.value)
								setIsShow(false)
							}}
							className='block  mb-4 last:mb-0 capitalize rounded-lg'
							style={
								isColorSelect
									? {
											backgroundColor: item.value
										}
									: {}
							}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
