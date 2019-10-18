import React from 'react';
import { Modal, View, StyleSheet, Image, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';


import Layout from '../config/Layout';
import axios from 'axios'
import { isConnected } from '../store/actions/user';

class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: 'titi@gmail.com',
        password: 'test',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
      axios.post('https://hackaton2019watcher.herokuapp.com/users/login', {
        email: this.state.email,
        password: this.state.password
      }).then(res => {
          this.props.isConnected(res.data);
          this.props.setModalVisible();
      })
  }


  render(){
    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
          <View style={{ flex: 1, marginTop: '50%' }}>
            <Image source={require('../images/logo.png')} style={styles.logo}/>
            <View style={styles.container}>
              <Input
                name='email'
                textContentType='emailAddress'
                onChangeText={(value) => this.setState({ email: value })}
                value={this.state.email}
                containerStyle={styles.containerInput}
                leftIconContainerStyle={styles.iconStyle}
                inputStyle={styles.inputStyle}
                placeholder='EMAIL'
                leftIcon={
                  <Icon
                    name='user'
                    type='font-awesome'
                    color='#000'
                    size={15}
                  />
                }
              />
              <Input
                textContentType='password'
                name='password'
                pass
                onChangeText={(value) => this.setState({ password: value })}
                value={this.state.password}
                containerStyle={styles.containerInput}
                leftIconContainerStyle={styles.iconStyle}
                inputStyle={styles.inputStyle}
                placeholder='PASSWORD'
                leftIcon={
                  <Icon
                    name='lock'
                    type='font-awesome'
                    color='#000'
                    size={15}
                  />
                }
              />
              <Button
                buttonStyle={styles.buttonStyle}
                title="Login"
                onPress={this.handleSubmit.bind(this)}
              />
              <Text style={styles.close} onPress={this.props.setModalVisible}>Close</Text>
            </View>
          </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.marginL
  },
  containerInput: {
    marginVertical: Layout.marginL
  },
  iconStyle: {
    marginRight: Layout.marginL
  },
  labelStyle: {
    fontWeight: '100',
    fontSize: 14
  },
  inputStyle: {
    fontWeight: '100',
    fontSize: 14,
    letterSpacing: 2
  },
  logo: {
    alignSelf: 'center',
    width: 165,
    height: 110
  },
  buttonStyle: {
    marginVertical: Layout.marginL,
    backgroundColor: '#000',
    width: Layout.window.width - 2*Layout.marginL,
    height: 50,
    borderRadius: Layout.radius
  },
  exit: {
    position: 'absolute',
    right: 0,
    top: Layout.marginL
  },
  close: {
    fontWeight: '100',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000"  }
})


const mapDispatchToProps = (dispatch) => {
  return {
    isConnected: (token) => dispatch(isConnected(token))
  }
};

export default connect(null, mapDispatchToProps)(LoginModal);
