'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

export function Statistics() {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 sm:gap-6  gap-12 mt-7'>
			{data?.statistics.length ? (
				data.statistics.map(statistic => (
					<div
						className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
						key={statistic.label}
					>
						<div className='lg:text-xl sm:text-sm md:text-md '>{statistic.label}</div>
						<div className='text-3xl font-semibold sm:text-md '>{statistic.value}</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	)
}
