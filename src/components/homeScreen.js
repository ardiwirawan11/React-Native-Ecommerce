import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Button, Icon, Image, Tabs, Tab, Right, Text, Header, ToastAndroid, Fab, Footer, Card, CardItem, Left, Body } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import axios from 'axios'
import { getProduct } from '../redux/action/ProductAction'
import { getMyproduct } from '../redux/action/MyproductAction'
import { getCart } from '../redux/action/CartAction'
import { getCoba } from '../redux/action/CobaAction'
import { getUser } from '../redux/action/userAction'
import { getDetail } from '../redux/action/DetailAction'

class homeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    cekLogin = async () => {
        const token = await AsyncStorage.getItem('@token');
        await this.props.get_User(token);
        if (token) {
            return this.props.navigation.navigate('Profil')
        } else {
            return this.props.navigation.navigate('Login')
        }
    }
    cekCart = async () => {
        const token = await AsyncStorage.getItem('@token');
        if (token) {
            return this.props.navigation.navigate('Cart')
        } else {
            return this.props.navigation.navigate('Login')
        }
    }
    cekAdd = async () => {
        const token = await AsyncStorage.getItem('@token');
        if (token) {
            return this.props.navigation.navigate('Add')
        } else {
            return this.props.navigation.navigate('Login')
        }
    }
    getProduct = async () => {
        await this.props.get_Product();
    }
    deleteProduct = async (id) => {
        const token = await AsyncStorage.getItem('@token');
        try {
            const apiDelete = await axios({
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                url: `https://glints-tim8-e-commerce.herokuapp.com/api/products/${id}`,
            })
            console.log(apiDelete.data)
            if (apiDelete.data) {
                this.getMyproduct()
                this.getProduct()
            }
        }
        catch (e) {
            console.log(e)
            ToastAndroid.show('Cannot Delete Item', ToastAndroid.SHORT)
        }

    }
    getMyproduct = async () => {
        const token = await AsyncStorage.getItem('@token');
        this.props.get_Myproduct(token);
        await this.props.get_User(token);
    }
    getCart = async () => {
        const token = await AsyncStorage.getItem('@token');
        await this.props.get_Cart(token);
        await this.props.get_Coba(token);
    }
    getDetail = async (id) => {
        const token = await AsyncStorage.getItem('@token');
        this.props.get_Detail(token,id);
        this.props.navigation.navigate('Detail')
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
            }
        }
        catch (e) {
            console.log(e)
            ToastAndroid.show('Cant buy', ToastAndroid.SHORT)
        }
    }
    componentDidMount() {
        this.getProduct();
        this.getMyproduct();
        this.getCart();
    }
    render() {
        
        const loops = this.props.product.map((item) => {
            return (
                <Card key={item._id}>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text onPress={() => this.getDetail(item._id)}>{item.name}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        {/* <Image source={{uri: item.picture}}/> */}
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Text>Harga : <Text>{item.price}</Text></Text>
                            <Text>Stok : <Text>{item.stock}</Text></Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Button onPress={() => this.addCart(item._id)}><Text>Add To</Text><Icon name='cart'></Icon></Button>
                        </Right>
                    </CardItem>
                </Card>
            )
        })
        const loops1 = this.props.myproduct.map((item) => {
            return (
                <Card key={item._id}>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{item.name}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        {/* <Image source={{uri: item.picture}}/> */}
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Text>Harga : <Text>{item.price}</Text></Text>
                            <Text>Stok : <Text>{item.stock}</Text></Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Button onPress={() => this.deleteProduct(item._id)}><Icon name='trash'></Icon></Button>
                        </Right>
                    </CardItem>
                </Card>
            )
        })
        
        return (
            <Container>
                <Header>
                    <Right>
                        <Button transparent
                            onPress={() => this.cekCart()}>
                            <Icon name='cart' />
                        </Button>
                        <Button transparent
                            onPress={() => this.cekLogin()}>
                            <Icon name='person' />
                        </Button>
                    </Right>

                </Header>


                <Tabs>
                    <Tab heading="All Product">
                        <Content>
                            {loops}
                        </Content>
                    </Tab>
                    <Tab heading="My Product">
                        <Content>
                            {loops1}
                        </Content>
                    </Tab>
                </Tabs>


                <Footer>
                    <Fab
                        position="bottomRight"
                        style={{ backgroundColor: '#5067FF' }}
                        onPress={() => this.cekAdd()}>
                        <Icon name="add" />
                    </Fab>
                </Footer>
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    product: state.product.data,
    myproduct: state.myproduct.data
});
const mapDispatchToProps = dispatch => {
    return {
        get_Product: () => dispatch(getProduct()),
        get_Myproduct: (token) => dispatch(getMyproduct(token)),
        get_Cart: (token) => dispatch(getCart(token)),
        get_Coba: (token) => dispatch(getCoba(token)),
        get_User: token => dispatch(getUser(token)),
        get_Detail: (token, id) => dispatch(getDetail(token, id))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(homeScreen);
