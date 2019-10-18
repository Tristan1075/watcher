import React from 'react';
import { View, Text, StyleSheet, Image, SectionList } from 'react-native';
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

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.watchContainer}>
      </View>
    );
  }

  render () {

    console.log(this.state.orderHistory)
    return(
      <View style={styles.container}>
        {this.state.orderHistory > 0 &&
        <SectionList
          sections={this.state.orderHistory}
          keyExtractor={(item, index) => item + index}
          renderItem={this._renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Layout.marginL,
  }
});

export default OrderScreen;
