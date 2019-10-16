import React from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
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
      <View>
        <CardWatch
          key={index}
          name={item.name}
          price={item.price}
          image={item.image}
          onPress={() => this.handlePress(item)}
        />
      </View>
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
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.products}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.FlatListItemSeparator}
        />
        <Button title='Créer ma montre personnalisée' buttonStyle={styles.button} onPress={this.handleCreateCustomWatch}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Layout.marginL
  },
  button: {
    margin: Layout.marginL,
    backgroundColor: '#000',
    borderRadius: Layout.radius
  }
});

export default HomeScreen;
