'use client'

import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { Button } from '@/components/ui/button'
import { boardService } from '@/services/board.service'

import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { FormPicker } from './form-picker'
import { IBoardResponse } from '@/types/board.types'


interface FormPopoverProps {
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  onBoardCreate: (newBoard: IBoardResponse) => void;
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
  onBoardCreate,
}: FormPopoverProps) => {
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)

  const { execute, fieldErrors } = useAction(boardService.createBoard.bind(boardService), {
    onSuccess: (data) => {
      toast.success('Board created!')
      closeRef.current?.click()
      onBoardCreate(data);
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string
    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|')
    const name = title
    execute({ name, imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose
          ref={closeRef}
          asChild
        >
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form
          action={onSubmit}
          className="space-y-4"
        >
          <div className="space-y-4">
            <FormPicker
              id="image"
              errors={fieldErrors}
            />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
