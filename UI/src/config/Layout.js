import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const margin = 4;
const radius = 10;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  color: {
    primary: '#fff',
    secondary: '#666666',
    button: '#1787FB',
    separator: '#d2d2d2'
  },
  margin: margin,
  marginL: margin*3,
  radius: radius
};
