import { Dimensions } from 'react-native';
import { prop } from 'ramda';

const dimensions = Dimensions.get('window');

const getWidth = prop('width');
const getHeight = prop('height');

export const getWindowWidth = () => getWidth(dimensions);
export const getWindowHeight = () => getHeight(dimensions);
