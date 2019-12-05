import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Content, Button, Icon, Tabs, Tab, Right, Text, Header, ToastAndroid, Fab, Footer, Card, CardItem, Left, Body } from 'native-base'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { getProduct } from '../redux/action/ProductAction'
import { getMyproduct } from '../redux/action/MyproductAction'
import { getCart } from '../redux/action/CartAction'

class detailScreen extends Component {
  getMyproduct = async () => {
    const token = await AsyncStorage.getItem('@token');
    this.props.get_Myproduct(token);
  }
  getCart = async () => {
    const token = await AsyncStorage.getItem('@token');
    await this.props.get_Cart(token);
  }
  addCart = async (id) => {
    const token = await AsyncStorage.getItem('@token');
    const qty = 1
    try {
      const apiOrder = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        url: 'https://glints-tim8-e-commerce.herokuapp.com/api/orders/',
        data: JSON.stringify({
          product: id,
          qty: qty
        })
      })
      console.log(apiOrder.data)
      if (apiOrder.data) {
        this.props.get_Product()
        this.getMyproduct()
        this.getCart();
        this.props.navigation.navigate('Home')
      }
    }
    catch (e) {
      console.log(e)
      ToastAndroid.show('Cant buy', ToastAndroid.SHORT)
    }
  }

  componentDidMount() {
    console.log('detailscreen ', this.props.detail);
  }

  render() {
    console.log('detailscreen ', this.props.detail);
    return (
      <Container>
        <Content>
          <Text>Name : <Text>{this.props.detail.name}</Text></Text>
          <Text>Price : <Text>{this.props.detail.price}</Text></Text>
          <Text>Stock : <Text>{this.props.detail.stock}</Text></Text>
          <Right>
            <Button onPress={() => this.addCart(this.props.detail._id)}><Text>Add To</Text><Icon name='cart'></Icon></Button>
          </Right>
        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => ({
  detail: state.detail.data
});

const mapDispatchToProps = dispatch => {
  return {
    get_Product: () => dispatch(getProduct()),
    get_Myproduct: (token) => dispatch(getMyproduct(token)),
    get_Cart: (token) => dispatch(getCart(token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(detailScreen);