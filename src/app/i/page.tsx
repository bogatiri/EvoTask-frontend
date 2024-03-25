import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Header } from '@/components/ui/Header'
import Statictics from './Statictics'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return <div>
		<Header title='Statistics' />
		<Statictics/>
	</div>
}
