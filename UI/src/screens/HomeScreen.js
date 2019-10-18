import React from 'react';
import { View, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon, Button } from 'react-native-elements';
import axios from 'axios';

import NavigationOptions from '../components/NavigationOptions';
import CardWatch from '../components/CardWatch';
import Layout from '../config/Layout';

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      ...NavigationOptions,
      drawerLabel: 'Home',
      drawerIcon: (
        <Icon
          onPress={() => navigation.popToTop()}
          name='home'
          type='font-awesome'
          color='#000'
          size={30}
        />
      ),
      headerTitle: (
        <Image style={{width: 85, height: 55}} source={require('../images/logo.png')}/>
      ),
      headerLeft: (
        <Icon
          onPress={() => navigation.openDrawer()}
          name='bars'
          type='font-awesome'
          color='#000'
          size={30}
        />
      ),
      name: 'Accueil',
      headerStyle: {
        backgroundColor: '#fff',
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        marginLeft: Layout.marginL
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
    this.handlePress.bind(this);
  }

  componentDidMount = () => {
    axios.get('https://hackaton2019watcher.herokuapp.com/products')
      .then(res => this.setState({ products: res.data}));
  };


   handlePress = (item) => {
    this.props.navigation.navigate('WatchDetail', { item });
  }

  _renderItem ({item, index}) {
    return (
      <Animatable.View key={index} animation={index%2 ? 'slideInLeft' : 'slideInRight'}>
        <CardWatch
          name={item.name}
          price={item.price}
          image={item.image}
          sizes={item.sizes}
          onPress={() => this.handlePress(item)}
        />
      </Animatable.View>
    );
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: Layout.color.separator,
        }}
      />
    );
  }

  handleCreateCustomWatch = () => {
     this.props.navigation.navigate('CustomWatch')
  }

  render () {
    console.disableYellowBox = true;
    return(
      <View style={{ flex: 1}}>
        <ScrollView>
          <Image source={require('../images/landscape.jpg')} style={styles.imageHome} />
          <View style={styles.container}>
            <FlatList
              data={this.state.products}
              renderItem={this._renderItem.bind(this)}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
        <Button title='Create my own watch' buttonStyle={styles.button} onPressIn={this.handleCreateCustomWatch}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Layout.marginL,
    zIndex: 10,
    marginTop: 150
  },
  button: {
    backgroundColor: '#000',
    marginTop: 0,
    color: '#fff',
    position: 'absolute',
    bottom: Layout.marginL,
    left: 3*Layout.marginL,
    right: 3*Layout.marginL,
    borderRadius: Layout.radius,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  imageHome: {
    marginTop: 15,
    position: 'absolute',
    width: Layout.window.width,
    height: 300
  }
});

export default HomeScreen;
