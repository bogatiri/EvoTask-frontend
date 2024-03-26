import type { Metadata } from 'next'

import { Header } from '@/components/ui/Header'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import TasksView from './TasksView'

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
}

const Page = () => {
	return (
		<div>
			<Header title='Tasks' />
			<TasksView />
		</div>
	)
}

export default Page
