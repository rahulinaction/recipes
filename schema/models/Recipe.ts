import React from 'react';
import Realm from 'realm';




export class RecipeLite extends Realm.Object<RecipeLite> {
  idMeal!: string;
  strMealThumb!:string;
  strMeal!: string; 
  favorite!: boolean;
  static schema = {
    name: 'RecipeLite',
    properties: {
      idMeal: 'string',
      strMealThumb: 'string',
      strMeal:'string',
      favorite: 'bool',
    },
    primaryKey: 'idMeal',
  };
}