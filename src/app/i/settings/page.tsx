import type { Metadata } from 'next'

import { Header } from '@/components/ui/Header'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Settings from './Settings'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div>
			<Header title='Settings' />
			<Settings />
		</div>
	)
}
