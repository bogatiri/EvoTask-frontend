import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from 'sonner'


import { SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'
import { Providers } from './providers'
import { cn } from '@/lib/utils'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Best one for planning from EvoTask'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={cn(zen.className, 'custom-scrollbar')}>
				<Providers>
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
					{children}

				</Providers>
			</body>
		</html>
	)
}
