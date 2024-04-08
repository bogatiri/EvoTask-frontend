import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { BoardList } from './board-list'

export const metadata: Metadata = {
	title: 'ScrumBan',
	...NO_INDEX_PAGE
}

export default function ScrumBanPage() {
	return (
		<div>
			<Heading title='ScrumBan' />
			<BoardList />
		</div>
	)
}
