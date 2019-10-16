import React from 'react';
import { View } from 'react-native'

import NavigationOptions from '../components/NavigationOptions';


class CustomWatchScreen extends React.Component {

  static navigationOptions = {
    ...NavigationOptions,
    title: 'Customizing watch',
  };
  constructor(props){
    super(props);
  }


  render () {

    return(
      <View>

      </View>

    );
  }
}


export default CustomWatchScreen;
