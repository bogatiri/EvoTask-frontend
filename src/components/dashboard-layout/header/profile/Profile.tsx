'use client'

import Loader from '@/components/ui/Loader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link'

export function Profile() {
	const { data, isLoading } = useProfile()

	

	return (
		<div className='absolute hidden md:block top-big-layout right-big-layout'>
			{isLoading ? (
				<Loader />
			) : (
				<Link
				href={`/i/profile/${data?.user.id}`}>
				<div className='flex items-center'>
					<div className='text-right mr-3'>
						<p className='font-bold -mb-1 sm:display-none'>{data?.user.name}</p>
						<p className='text-sm opacity-40'>{data?.user.email}</p>
					</div>
					{data?.user.avatar ? (
						<Avatar>
							<AvatarImage src={data?.user.avatar} />
							<AvatarFallback>AV</AvatarFallback>
						</Avatar>
					) : (
						<div className='w-10 h-10 flex justify-center items-center text-2xl  bg-white/20 rounded uppercase'>
							{data?.user.name?.charAt(0) || data?.user.email?.charAt(0)}
						</div>
					)}
				</div>
			</Link>
			)}
		</div>
	)
}
