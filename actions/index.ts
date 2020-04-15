import * as ListActions from './list';
import * as DetailActions from './detail';
export const ActionCreators = (<any>Object).assign({},
    ListActions,
    DetailActions
);