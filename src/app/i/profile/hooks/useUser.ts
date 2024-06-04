import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'


import { userService } from '@/services/user.service'
import { IUser } from '@/types/auth.types'


export function useUserById(userId: string) {
  const { data: user, isLoading, error   } = useQuery<IUser>({
    queryKey: ['user', userId], 
    queryFn: () => userService.getUserById(userId),
  })
  return { user, isLoading, error }
}
