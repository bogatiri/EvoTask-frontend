'use client'

import Loader from '@/components/ui/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import SwitcherView  from './SwitcherView'
// import { KanbanView } from './kanban-view/KanbanView'
import  ListView  from './list-view/ListView'

export type TypeView = 'list' | 'kanban'

const TasksView = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-type',
		defaultValue:'list' //kanban
	})
	return (
		<div>
			<SwitcherView
			setType={setType}
			type={type}
			/>
			{type === 'list' ? <ListView /> : ''}
			
		</div>
	)
}

export default TasksView
