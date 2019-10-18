import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import axios from 'axios';

import NavigationOptions from '../components/NavigationOptions';
import Layout from '../config/Layout';


class OrderScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      ...NavigationOptions,
      title: 'Orders',
      headerLeft: (
        <Icon
          onPress={() => navigation.openDrawer()}
          name='bars'
          type='font-awesome'
          color='#000'
          size={30}
        />
      ),
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
      orderHistory: []
    }
  }

  componentDidMount () {
    axios.post('https://hackaton2019watcher.herokuapp.com/order/history', { id_user: '5da867af1c9d440000f00224'}).then(res => {
      this.setState({ orderHistory: res.data});
    })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('prevProps', prevProps.orderHistory);
    console.log('props', this.props.orderHistory);
  }

  _renderItem = ({item, index}) => {

    const  d = new Date(item.date_created);
    return (
      <View style={styles.listContainer}>
        <Text>Order ID</Text>
        <Text style={{ fontWeight: 'bold'}}>{item._id}</Text>
        <Text style={{ fontWeight: '100', fontSize: 12}}>Shipping ID : {item.id_shipping}</Text>
        <Text style={{ fontWeight: '100', fontSize: 12}}>{d.toLocaleString()}</Text>
      </View>
    );
  }

  render () {
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.orderHistory}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.FlatListItemSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    margin: Layout.marginL,
    backgroundColor: '#f4f4f4',
    padding: Layout.marginL,
    borderRadius: Layout.radius,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }
});

export default OrderScreen;
