import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import NavigationOptions from '../components/NavigationOptions';
import Layout from '../config/Layout';
import { addProduct } from '../store/actions/products';


/*
type props {
  image: string
  name: string
  price: string
}
*/

class WatchDetailScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      ...NavigationOptions,
      title: 'Detail',
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('addCart')}>
          <Icon
            name='cart-plus'
            type='font-awesome'
            color='#000'
            size={30}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        marginRight: Layout.marginL
      }
    }
  };

  componentDidMount () {
    this.props.navigation.setParams({ addCart: this.handleAddCart });
  }

  handleAddCart = async () => {

    const { item } = this.props.navigation.state.params;

    this.props.addProduct(item);
    this.props.navigation.navigate('Cart');
  }

  render () {

    const { item } = this.props.navigation.state.params;

    return(
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.image}}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}€</Text>
          <Text style={styles.presentation}>{item.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Button" buttonStyle={styles.buttonStyle} />
          <Button
              title="Button"
              buttonStyle={styles.buttonStyle}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 40,
    width:100,
    marginHorizontal: 2*Layout.marginL,
    borderRadius:10,
    backgroundColor: '#000'
  },
  container: {
    flex: 1,
    margin: Layout.marginL,
  },
  imageContainer: {
    borderRadius: Layout.radius,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    borderRadius: Layout.radius,
    width: Layout.window.width - 2*Layout.marginL,
    height: 400,
  },
  textContainer: {
    paddingVertical: Layout.marginL,
    paddingHorizontal: 4*Layout.marginL
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 2,
    alignItems: 'center'
  },
  price: {
    alignItems: 'center',
    fontWeight: '100',
    fontSize: 33
  },
  presentation: {
    paddingVertical: Layout.marginL,
    color: Layout.color.secondary,
    fontWeight: '100',
    textAlign: 'justify',
  },
  description: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000'
  }
});


const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (item) => dispatch(addProduct(item))
  }
};

export default connect(null, mapDispatchToProps)(WatchDetailScreen);
