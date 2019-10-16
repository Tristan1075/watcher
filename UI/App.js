
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator} from 'react-navigation-stack';
import { Provider } from 'react-redux';

import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import CustomWatchScreen from './src/screens/CustomWatchScreen';
import WatchDetailScreen from './src/screens/WatchDetailScreen';
import configureStore from './src/store/configureStore'


const AppNavigator = createDrawerNavigator(
  {
    HomeDrawer: createStackNavigator({
      Home: {
        screen: HomeScreen,
      },
      WatchDetail: {
        screen: WatchDetailScreen
      },
      Cart:{
        screen: CartScreen
      },
      CustomWatch: {
        screen: CustomWatchScreen
      }
    }),
    CartDrawer: createStackNavigator({
      Cart: {
        screen: CartScreen,
      }
    })
  },{
    initialRouteName: 'HomeDrawer',
    contentOptions: {
      activeTintColor: '#e91e63',
    }
  });

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render(){

    const store = configureStore()

    return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}

export default App;
