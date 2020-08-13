import { compose, not, equals, curry } from 'ramda';

export const isNotEqual = curry(compose(not, equals));
