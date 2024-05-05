'use client'

import Loader from '@/components/ui/Loader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { useProfile } from '@/hooks/useProfile'

export function Profile() {
	const { data, isLoading } = useProfile()

	//
	// {`${avatarPath}${data?.user.avatar}`}
	return (
		<div className='absolute top-big-layout right-big-layout'>
			{isLoading ? (
				<Loader />
			) : (
				<div className='flex items-center'>
					<div className='text-right mr-3'>
						<p className='font-bold -mb-1'>{data?.user.name}</p>
						<p className='text-sm opacity-40'>{data?.user.email}</p>
					</div>
					{data?.user.avatar ? (
						<Avatar>
							<AvatarImage src={data?.user.avatar} />
							<AvatarFallback>AV</AvatarFallback>
						</Avatar>
					) : (
						<div className='w-10 h-10 flex justify-center items-center text-2xl text-white bg-white/20 rounded uppercase'>
							{data?.user.name?.charAt(0) || 'A'}
						</div>
					)}
				</div>
			)}
		</div>
	)
}
