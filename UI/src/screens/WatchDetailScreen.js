import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Badge } from 'react-native-elements';

import NavigationOptions from '../components/NavigationOptions';
import Layout from '../config/Layout';
import { addProduct } from '../store/actions/products';
import Carousel from 'react-native-snap-carousel'
import { ProgressStep } from 'react-native-progress-steps'


/*
type props {
  image: string
  name: string
  price: string
  size: Array<string>
}
*/

class WatchDetailScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      ...NavigationOptions,
      title: 'Detail',
      headerRight: (
        <View>
          <Badge
            status="warning"
            value={navigation.getParam('value')}
            badgeStyle={{ backgroundColor: '#000' }}
            containerStyle={{ position: 'absolute', top: -15, right: -2, zIndex: 10, alignItems: 'center' }}
            textStyle={{ textAlign: 'center'}}
          />
          <TouchableOpacity onPress={navigation.getParam('addCart')}>
          <Icon
            name='cart-plus'
            type='font-awesome'
            color='#000'
            size={30}
          />
        </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        marginRight: Layout.marginL
      }
    }
  };

  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  componentDidMount () {
    this.props.navigation.setParams({ addCart: this.handleAddCart });
    this.props.navigation.setParams({ value: this.state.value })
  }

  handleAddCart = () => {

    const { item } = this.props.navigation.state.params;
    this.props.addProduct(item);
    this.setState({ value: this.state.value + 1}, () => {
      this.props.navigation.setParams({ value: this.state.value })
    });

  }

  _renderItem = ({item, index}) => {
    console.log(item)
    return (
      <View style={styles.watchContainer}>
        <Image source={{ uri: item }} style={styles.image}/>
      </View>
    );
  }

  render () {

    const { item } = this.props.navigation.state.params;
    return(
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          {item.images ?
          <Carousel
            ref={this.saveCarouselRef}
            data={item.images}
            renderItem={this._renderItem}
            sliderWidth={Layout.window.width - Layout.margin}
            itemWidth={Layout.window.width - Layout.margin}
            enableMomentum={true}
            activeSlideOffset={10}
            adding removeClippedSubviews={false}
            onBeforeSnapToItem={this.handleSnapToItem}
          /> :
            <Image
              source={{uri: item.image}}
              style={styles.image}
            />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}€</Text>
          <View style={{ flexDirection: 'row'}}>
          {item.sizes.map((size, index) => (
            <View key={index} style={styles.sizeContainer}>
              <Text style={styles.size}>{size}</Text>
            </View>
          ))}
          </View>
          <Text style={styles.presentation}>{item.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="AR Watch" buttonStyle={styles.buttonStyle} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 40,
    width: 300,
    marginHorizontal: 2*Layout.marginL,
    marginBottom: Layout.marginL,
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
    fontWeight: '200',
    textTransform: 'uppercase',
    fontSize: 33,
    alignItems: 'center'
  },
  price: {
    alignItems: 'center',
    fontWeight: '100',
    fontSize: 24
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
  },
  sizeContainer: {
    marginTop: Layout.marginL,
    marginRight: Layout.marginL,
    width: 50,
    borderWidth: 1,
    padding: Layout.marginL,
    justifyContent: 'center'
  },
  size: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});


const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (item) => dispatch(addProduct(item))
  }
};

export default connect(null, mapDispatchToProps)(WatchDetailScreen);
