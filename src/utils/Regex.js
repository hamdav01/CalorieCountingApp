import { replace } from 'ramda';

export const keepAllNumbers = replace(/\D/g, '');
