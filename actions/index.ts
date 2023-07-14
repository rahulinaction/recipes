import * as ListActions from './list';
import * as DetailActions from './detail';
import * as FavoriteActions from './favorite';

type ActionCreator = typeof ListActions & typeof DetailActions & typeof FavoriteActions ;

export const ActionCreators: ActionCreator = Object.assign({},
  ListActions,
  DetailActions,
  FavoriteActions
);