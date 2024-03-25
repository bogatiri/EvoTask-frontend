'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

const Statictics = () => {
	const { data, isLoading } = useProfile()
	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 md:grid-cols-4  sm:grid-cols-1 sm:gap-8 gap-12 mt-7'>
			{data?.statistics.length ? (
				data.statistics.map(statistics => (
					<div
						className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
						key={statistics.label}
					>
						<div className='text-xl'>{statistics.label}</div>
						<div className='text-xl font-semibold'>{statistics.value}</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	)
}

export default Statictics
