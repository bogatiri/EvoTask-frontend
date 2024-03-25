import type { PropsWithChildren } from 'react'

import Dashboardlayout from '@/components/dashboard/Dashboard-layout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <Dashboardlayout>{children}</Dashboardlayout>
}
