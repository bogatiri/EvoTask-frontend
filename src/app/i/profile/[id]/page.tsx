import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import UserId from './Profile'

export const metadata: Metadata = {
	title: 'Profile',
	...NO_INDEX_PAGE
}

export default function ScrumBanPage() {
	return (
		<div>
			<UserId />
		</div>
	)
}
