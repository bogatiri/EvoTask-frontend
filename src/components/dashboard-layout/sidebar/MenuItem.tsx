import Link from 'next/link'

import { IMenuItem } from './menu.interface'

interface IMenuItemProps {
	sidebar?: number | null
	item: IMenuItem 
	currentUser: string
}

export function MenuItem({ item, sidebar, currentUser }: IMenuItemProps) {
	return (
		<div className=''>
			<Link
				href={item.name ==='Profile' ? `${item.link}/${currentUser}` : item.link}
				className={`flex gap-2.5 ${sidebar! < 10 && 'justify-center w-full'} items-center py-1.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg`}
			>
				{(sidebar! > 10 || sidebar! < 10) && (

				<item.icon />
				)}
				{sidebar!  > 9 && (

				<span>{item.name}</span>
				)}
			</Link>
		</div>
	)
}
