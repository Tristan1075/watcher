
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator} from 'react-navigation-stack';
import { Provider } from 'react-redux';

import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import CustomWatchScreen from './src/screens/CustomWatchScreen';
import OrderScreen from './src/screens/OrderScreen';
import WatchDetailScreen from './src/screens/WatchDetailScreen';
import HelpScreen from "./src/screens/HelpScreen";
import configureStore from './src/store/configureStore'
import { Icon } from 'react-native-elements'


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
    }, {
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='home'
            type='font-awesome'
            color='#000'
            size={30}
          />
        )
      }
    }),
    CartDrawer: createStackNavigator({
      Cart: {
        screen: CartScreen,
      }
    }, {
      navigationOptions: {
        drawerLabel: 'Cart',
        drawerLabelColor: '#c2c2c2',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='shopping-cart'
            type='font-awesome'
            color='#000'
            size={30}
          />
        )
      }
    }),
    OrderDrawer: createStackNavigator({
      Order: {
        screen: OrderScreen,
      }
    }, {
      navigationOptions: {
        drawerLabel: 'Order',
        drawerIcon: ({tintColor}) => (
          <Icon
            name='list-alt'
            type='font-awesome'
            color='#000'
            size={30}
          />
        )
      }
    }),
    HelpDrawer: createStackNavigator({
      Help: {
        screen: HelpScreen,
      }
    }, {
      navigationOptions: {
        drawerLabel: 'Help',
        drawerIcon: ({tintColor}) => (
          <Icon
            name='question-circle'
            type='font-awesome'
            color='#000'
            size={30}
          />
        )
      }
    })
  },{
    initialRouteName: 'HomeDrawer',
    contentOptions: {
      activeTintColor: '#000000',
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
