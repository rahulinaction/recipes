import * as ListActions from './list';
import * as DetailActions from './detail';

type ActionCreator = typeof ListActions & typeof DetailActions  ;

export const ActionCreators: ActionCreator = Object.assign({},
  ListActions,
  DetailActions
);