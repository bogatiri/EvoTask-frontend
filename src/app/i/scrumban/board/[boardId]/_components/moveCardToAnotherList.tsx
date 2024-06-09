import { Move } from 'lucide-react'

import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger
} from '@/components/ui/menubar'

import { IListResponse } from '@/types/list.types'

import { useMoveCardToAnotherList } from '../../../hooks/card/useMoveCardToAnotherList'

interface IMoveCardToAnotherListProps {
	orderedData?: IListResponse[]
	cardId: string
}

const MoveCardToAnotherList = ({
	orderedData,
	cardId
}: IMoveCardToAnotherListProps) => {
	const { moveCardToAnotherList } = useMoveCardToAnotherList()

	const onMoveCardToAnotherList = (listId: string) => {
		moveCardToAnotherList({ cardId, listId })
	}
	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger className='flex justify-center items-center h-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
					<div className='flex justify-center items-center h-10 px-3'>
						<Move className='hidden md:block h-4 w-4' />
						<span className='text-sm mx-3 my-1.5'>Move card</span>
					</div>
				</MenubarTrigger>
				<MenubarContent>
					<MenubarSeparator />
					{orderedData?.map((list, index) => (
						<div key={index}>
							<div onClick={() => onMoveCardToAnotherList(list.id)}>
								<div className='relative flex justify-between select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground opacity-70 hover:opacity-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer'>
									<span className='ml-1 flex gap-2'>
										{list.type
											? list.type
											: list.name
												? list.name
												: `''Nameless''`}
									</span>
								</div>
							</div>
							<MenubarSeparator />
						</div>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}

export default MoveCardToAnotherList
