import React from 'react';
import Realm from 'realm';

//Recipe Lite model
export class RecipeLite extends Realm.Object<RecipeLite> {
  idMeal!: string;
  strMealThumb!:string;
  strMeal!: string; 
  favorite!: boolean;
  date!: Date;
  static schema = {
    name: 'RecipeLite',
    properties: {
      idMeal: 'string',
      strMealThumb: 'string',
      strMeal:'string',
      favorite: 'bool',
      date: 'date'
    },
    primaryKey: 'idMeal',
  };
}

//@todo recipe detail model for storing content