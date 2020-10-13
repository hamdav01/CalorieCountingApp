import {  findIndex, remove, eqProps, update, append } from 'ramda';
import shortid from 'shortid';

export const ProductActions = {
  ADD: 'addProduct',
  REMOVE: 'removeProduct',
  UPDATE: 'updateProduct',
  INIT: 'initProducts',
};

const generateTemplateProduct = () => ({
  name: 'Undefined',
  kcal: 0,
  grams: 0,
  id: shortid.generate(),
});

export const productReducer = (state, action) => {
  switch (action.type) {
    case ProductActions.INIT: {
      return action.data;
    }
    case ProductActions.ADD: {
      return append(generateTemplateProduct(), state);
    }
    case ProductActions.REMOVE: {
      const equalsId = eqProps('id', action);
      const index = findIndex(equalsId, state);
      return remove(index, 1, state);
    }
    case ProductActions.UPDATE: {
      const { data } = action;
      const equalsId = eqProps('id', data);
      const index = findIndex(equalsId, state);
      return update(index, data, state);
    }
    default:
      throw new Error('No Producer actions exists for this');
  }
};
