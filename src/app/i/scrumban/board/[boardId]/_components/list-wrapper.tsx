interface ListWrapperProps {
	children: React.ReactNode
}

export const ListWrapper = ({ children }: ListWrapperProps) => {
	return (
		<li className=' shrink-0 h-full w-[45vh] md:w-[272px] select-none list-item'>
			{children}
		</li>
	)
}
