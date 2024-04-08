'use client'

import { useQuery } from '@tanstack/react-query'


import { fetcher } from '@/lib/fetcher'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { Header } from './header'
import { Description } from './description'
import { Actions } from './actions'
import { useCardModal } from '@/app/i/scrumban/hooks/card/use-card-modal'
import { ICardResponse } from '@/types/card.types'
import { cardService } from '@/services/card.service'
// import { Activity } from './activity'

export const CardModal = () => {
  const id = useCardModal((state) => state.id)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  const { data: cardData } = useQuery<ICardResponse>({
    queryKey: ['card', id],
    queryFn: () => cardService.getCardByCardId(id!),
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
