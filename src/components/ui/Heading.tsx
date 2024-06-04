'use client'

import { usePathname } from 'next/navigation'


interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	const pathName = usePathname()
	if (!pathName.includes('board'))
	return (
		<div className='m-big-layout hidden md:block '>
			<h1 className='text-3xl font-medium'>{title}</h1>
			<div className='my-3 h-0.5 bg-border w-full' />
		</div>
	)
}
