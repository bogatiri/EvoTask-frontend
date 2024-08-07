import clsx from 'clsx'
import { randomUUID } from 'crypto'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CardDescription, CardTitle } from '@/components/ui/card'

import Banner from '../../../public/appBanner.png'
import Cal from '../../../public/icons/cal.png'

import CustomCard from './custom-card'
import TitleSection from './title-section'
import { CLIENTS, USERS } from '@/lib/constants'

const HomePage = () => {
	return (
		<div className='custom-scrollbar'>
			<section
				className=' overflow-hidden
      px-4
      sm:px-6
      mt-10
      sm:flex
      sm:flex-col
      gap-4
      md:justify-center
      md:items-center'
			>
				<TitleSection
					pill='✨ Your Workspace, Perfected'
					title='The Evolution of Your Project Management.'
				/>
				<div
					className='
					z-50
					cursor-pointer
          p-[2px]
          mt-6
          rounded-xl
          bg-gradient-to-r
          from-primary
          to-brand-primaryBlue
          sm:w-[300px]
        '
				>
					<Link href='/auth'>
						<Button
							variant='btn-secondary'
							className=' 
						cursor-pointer
						z-50
						w-full
            rounded-[10px]
            p-6
            text-2xl
            bg-background
						border-border
						text-foreground
          '
						>
							Get EvoTask Free
						</Button>
					</Link>
				</div>
				<div
					className='md:mt-[-90px]
          w-[750px]
          flex
          justify-center
          items-center
          mt-[-0px]
          relative
          sm:ml-[-50px]
          md:ml-[-50px]
        '
				>
					<Image
						className='mt-10 w-[60%] sm:w-[100vw] ml-0 mr-[350px] md:mr-0'
						src={Banner}
						alt='Application Banner'
					/>
					<div
						className='bottom-0
            top-[50%]
            bg-gradient-to-t
            from-background
            left-0
            right-0
            absolute
            z-10
          '
					></div>
				</div>
			</section>
			<section className='relative'>
				<div
					className="overflow-hidden
          flex
          after:content['']
          after:to-transparent
          after:from-background
          after:bg-gradient-to-l
          after:right-0
          after:bottom-0
          after:top-0
          after:w-20
          after:z-10
          after:absolute

          before:content['']

          before:to-transparent
          before:from-background
          before:bg-gradient-to-r
          before:left-0
          before:top-0
          before:bottom-0
          before:w-20
          before:z-10
          before:absolute
        "
				>
					{[...Array(2)].map(arr => (
						<div
							key={randomUUID()}
							className='flex
                flex-nowrap
                animate-slide
          '
						>
							{CLIENTS.map(client => (
								<div
									key={randomUUID()}
									className=' relative
                    w-[200px]
                    m-20
                    shrink-0
                    flex
                    items-center
                  '
								>
									<Image
										src={client.logo}
										alt={client.alt}
										width={200}
										className='object-contain max-w-none'
									/>
								</div>
							))}
						</div>
					))}
				</div>
			</section>
			<section
				className='px-4
        sm:px-6
        flex
        justify-center
        items-center
        flex-col
        relative
      '
			>
				<div
					className='w-[30%]
          blur-[120px]
          rounded-full
          h-32
          absolute
          bg-brand-primaryPurple/50
          -z-10
          top-56
        '
				/>
				<TitleSection
					title='Keep track of your meetings all in one place'
					subheading='Capture your ideas, thoughts, and meeting notes in a structured and organized manner.'
					pill='Features'
				/>
				<div
					className='
					mt-10
          max-w-[450px]
          flex
          justify-center
          items-center
          relative
          sm:ml-0
          rounded-2xl
          border-8
          border-washed-purple-300
          border-opacity-10
        '
				>
					<Image
						src={Cal}
						alt='Banner'
						className='rounded-xl'
					/>
				</div>
			</section>
			<section className='relative'>
				<div
					className='w-full
          blur-[120px]
          rounded-full
          h-32
          absolute
          bg-brand-primaryPurple/50
          -z-100
          top-56
        '
				/>
				<div
					className='mt-20
          px-4
          sm:px-6 
          flex
          flex-col
          overflow-hidden
        '
				>
					<TitleSection
						title='Trusted by all'
						subheading='Join thousands of satisfied users who rely on our platform for their 
            personal and professional productivity needs.'
						pill='Testimonials'
					/>
					{[...Array(2)].map((arr, index) => (
						<div
							key={randomUUID()}
							className={twMerge(
								clsx('mt-10 flex flex-nowrap gap-6 self-start', {
									'flex-row-reverse': index === 1,
									'animate-[slide_250s_linear_infinite]': true,
									'animate-[slide_250s_linear_infinite_reverse]': index === 1,
									'ml-[100vw]': index === 1
								}),
								'hover:paused'
							)}
						>
							{USERS.map((testimonial, index) => (
								<CustomCard
									key={randomUUID()}
									className='w-[500px]

                  shrink-0s
                  rounded-xl
                  bg-gradient-to-t
                from-border 
									to-background
                '
									cardHeader={
										<div
											className='flex
                      items-center
                      gap-4
                  '
										>
											<Avatar>
												<AvatarImage src={`/avatars/${index + 1}.png`} />
												<AvatarFallback>AV</AvatarFallback>
											</Avatar>
											<div>
												<CardTitle className='text-foreground'>
													{testimonial.name}
												</CardTitle>
												<CardDescription className='text-washed-purple-800'>
													{testimonial.name.toLocaleLowerCase()}
												</CardDescription>
											</div>
										</div>
									}
									cardContent={
										<p className='text-washed-purple-800'>
											{testimonial.message}
										</p>
									}
								></CustomCard>
							))}
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default HomePage
