import {
	CalendarRange,
	KanbanSquare,
	LayoutDashboard,
	User,
	Settings,
	Timer,
	FolderKanban
} from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: User,
		link: DASHBOARD_PAGES.PROFILE,
		name: 'Profile'
	},
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: 'Dashboard'
	},
	{
		icon: KanbanSquare,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Tasks'
	},
	// {
	// 	icon: Timer,
	// 	link: DASHBOARD_PAGES.TIMER,
	// 	name: 'Pomodoro'
	// },
	// {
	// 	icon: CalendarRange,
	// 	link: DASHBOARD_PAGES.TIME_BLOCKING,
	// 	name: 'Time blocking'
	// },

	{
		icon: FolderKanban,
		link: DASHBOARD_PAGES.SCRUMBAN,
		name: 'Scrumban'
	},
	// {
	// 	icon: Settings,
	// 	link: DASHBOARD_PAGES.SETTINGS,
	// 	name: 'Settings'
	// },
]
