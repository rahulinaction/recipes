import * as types from './types';




export function setFavorite(id: number) {
    return {
        type: types.SET_FAVORITE,
        id
    }
}