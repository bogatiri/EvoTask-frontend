import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Statistics } from './Statistics'
import { usePathname } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {

	return (
		<div className='overflow-y-hidden'>
			<Heading title='Statistics' />
			<Statistics />
		</div>
	)
}
