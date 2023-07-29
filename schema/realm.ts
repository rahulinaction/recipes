
//Although realm provides observer 
import Realm from 'realm';
import { RecipeLite } from './models/Recipe';
import {createRealmContext} from '@realm/react';

export const realmConfig: Realm.Configuration = {
  path:'myrealm',
  schema: [RecipeLite] 
}

export const getRealmConnection = async () => {
  return await Realm.open(realmConfig);
}
//Needed for hooks setup
export const realmContext = createRealmContext(realmConfig);

