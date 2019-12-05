import React, { Component } from 'react'
import { Container, Content, Button, Icon, Image, Tabs, Tab, Right, Text, Header, Toast, Fab, Footer, Card, CardItem, Left, Body } from 'native-base'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { getCart } from '../redux/action/CartAction'
import { getCoba } from '../redux/action/CobaAction'

class cartScreen extends Component {

    static navigationOptions = {
        header: null
    }

    getCart = async () => {
        const token = await AsyncStorage.getItem('@token');
        await this.props.get_Coba(token);
        await this.props.get_Cart(token);
    }

    Checkout = async () => {
        const token = await AsyncStorage.getItem('@token');
        try {
            const apiCheckout = await axios({
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                url: 'https://glints-tim8-e-commerce.herokuapp.com/api/cart/checkout',

            })
            console.log("response api ",apiCheckout.data)
                this.getCart()
               Toast.show({text:"Success",type:"success",duration:5000})
                this.props.navigation.navigate('Home')


        }
        catch (e) {
            console.log("error catch ",e)
        }
    }
    componentDidMount() {
        this.getCart()
    }

    render() {

        const loops = this.props.coba ? this.props.coba.map((item) => {
            return (
                <Card key={item._id}>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{item._product.name}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Text>Harga : <Text>{item._product.price}</Text></Text>
                        </Right>
                    </CardItem>
                </Card>
            )
        }) : console.log('coba',this.props.coba);
        
        return (
            <Container>
                <Header>
                    <Button>
                        <Text>
                            History
                        </Text>
                    </Button>

                </Header>
                <Content>
                    {loops}
                </Content>

                <Footer>
                    <Left>
                        <Text>Total Harga : <Text>{this.props.cart.totalPrice}</Text></Text>
                    </Left>
                    <Right>
                        <Button onPress={() => this.Checkout()}>
                            <Text>
                                Checkout
                        </Text>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    cart: state.cart.data,
    coba: state.coba.data
});
const mapDispatchToProps = dispatch => {
    return {
        get_Cart: (token) => dispatch(getCart(token)),
        get_Coba: (token) => dispatch(getCoba(token))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(cartScreen);
