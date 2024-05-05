import { cardService } from '@/services/card.service'
import { ICardResponse, TypeCardFormState } from '@/types/card.types'

interface IBindUpdateCard{
	id: string,
	data: TypeCardFormState
}


export const bindUpdateCard = async ({ id, data }: IBindUpdateCard) => {
  try {
    const response = await cardService.updateCard(id, data);
    return response;
  } catch (error) {
    console.error('Error updating card:', error);
    throw error; // Возвращаем ошибку, чтобы она могла быть обработана в onError
  }
};
