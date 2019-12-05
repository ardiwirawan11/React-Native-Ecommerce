import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Content, Button, Icon, Tabs, Tab, Right, Text, Header, ToastAndroid, Fab, Footer, Card, CardItem, Left, Body } from 'native-base'
import { connect } from 'react-redux'
import { getUser } from '../redux/action/userAction'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

class profilScreen extends Component {
  getToken = async () => {
    const token = await AsyncStorage.getItem('@token');
    this.props.get_User(token);
  }
  removeToken = async () => {
    await AsyncStorage.removeItem('@token');
    this.props.navigation.navigate('Login')
  }
  update = async () => {
    const token = await AsyncStorage.getItem('@token');
    const id = this.props.user.data._id
    const data = { "isMerchant": true }
    axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      url: `https://glints-tim8-e-commerce.herokuapp.com/api/users/${id}`,
      data: data
    })
      .then((res) => {
        console.log('data dari api nya ', res.data);
        return res.data
      });
    this.props.get_User(token);
    this.removeToken()
  };


  componentDidMount() {
    this.getToken();
  }

  render() {
    const a =
      <Button
        onPress={() =>
          this.update()
        }>
        <Text>Upgrade To Merchant</Text>
      </Button>
    const b = console.log('is merchant', this.props.user.data.isMerchant)

    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: this.props.user.data.picture
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text>Name : <Text>{this.props.user.data.name}</Text></Text>
          <Text>Email : <Text>{this.props.user.data.email}</Text></Text>
          {this.props.user.data.isMerchant == false ? a : b}
          <Button
            onPress={() =>
              this.removeToken()
            }>
            <Text>LogOut</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => {
  return {
    get_User: token => dispatch(getUser(token))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(profilScreen);