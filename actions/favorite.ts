import * as types from './types';

export const setFavorite = (id: number) => {
  return {
    type: types.SET_FAVORITE,
    id
  }
}