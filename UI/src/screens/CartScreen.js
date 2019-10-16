import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import NavigationOptions from '../components/NavigationOptions';
import Layout from '../config/Layout'


class CartScreen extends React.Component {

    static navigationOptions = {
        ...NavigationOptions,
        title: 'Panier',
    };
    constructor(props){
        super(props);
        this.state = {
            products: [],
            totalCart: 0
        };
    }

    componentDidMount  () {
        this.setState({ products: this.props.products.products});
    }

    _renderItem ({item, index}) {
        return (
          <View key={index} style={styles.itemContainer}>
              <Image
                source={{uri: item.image}}
                style={styles.image}
              />
              <View style={styles.informations}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}€</Text>
              </View>
          </View>
        );
    }

    FlatListItemSeparator = () => {
        return (
          <View
            style={{
                height: 1,
                width: Layout.window.width - 2*Layout.marginL,
                backgroundColor: Layout.color.separator,
            }}
          />
        );
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
              <View style={styles.totalCart}>
                  <View style={{ flexDirection: 'row', paddingVertical: Layout.marginL }}>
                      <Text style={styles.totalCartTitle}>Total Panier : </Text>
                      <Text style={styles.totalCartPrice}>{this.state.totalCart}€</Text>
                  </View>
                  <Button title="Payer" buttonStyle={styles.buttonStyle}/>

              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Layout.marginL,
    },
    itemContainer: {
        flexDirection: 'row',
        borderRadius: Layout.radius,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        paddingHorizontal: Layout.margin,
        paddingVertical: Layout.marginL
    },
    image: {
        borderRadius: Layout.radius,
        width: 150,
        height: 150,
    },
    informations: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16
    },
    name: {
        fontSize: 24,
        letterSpacing: 2,
        fontWeight: 'bold',
        paddingLeft: 2*Layout.marginL,
        paddingRight: Layout.marginL
    },
    price: {
        fontSize: 24,
        letterSpacing: 2,
        fontWeight: '100',
        paddingHorizontal: Layout.marginL
    },
    totalCart: {
        backgroundColor: '#f4f4f4',
        height: 150,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: Layout.marginL,
    },
    totalCartTitle: {
        fontSize: 20,
        letterSpacing: 2,
        fontWeight: '300',
    },
    totalCartPrice: {
        fontSize: 20,
        fontWeight: '100',
    },
    buttonStyle: {
        backgroundColor: '#000'
    }
});

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps, null)(CartScreen);
