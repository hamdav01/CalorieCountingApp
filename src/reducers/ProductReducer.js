import {
  concat,
  prop,
  compose,
  findIndex,
  equals,
  filter,
  slice,
  length,
  inc,
} from 'ramda';
import { isNotEqual } from '../utils/Boolean';
import shortid from 'shortid';

export const ProductActions = {
  ADD: 'addProduct',
  REMOVE: 'removeProduct',
  UPDATE: 'updateProduct',
};

const generateTemplateProduct = () => [
  {
    name: 'Undefined',
    kcal: 0,
    grams: 0,
    id: shortid.generate(),
  },
];

const getId = prop('id');

export const productReducer = (state, action) => {
  switch (action.type) {
    case ProductActions.ADD: {
      return concat(state, generateTemplateProduct());
    }
    case ProductActions.REMOVE: {
      const { id } = action;
      const isNotEqualToId = compose(isNotEqual(id), getId);
      return filter(isNotEqualToId, state);
    }
    case ProductActions.UPDATE: {
      const { name, grams, kcal, id } = action;
      const equalsId = compose(equals(id), getId);
      const index = findIndex(equalsId, state);
      return [
        ...slice(0, index, state),
        {
          name,
          grams,
          kcal,
          id,
        },
        ...slice(inc(index), length(state), state),
      ];
    }
    default:
      throw new Error('No Producer actions exists for this');
  }
};
