import * as ListActions from './list';
import * as DetailActions from './detail';
import * as FavoriteActions from './favorite';
export const ActionCreators = (<any>Object).assign({},
    ListActions,
    DetailActions,
    FavoriteActions
);