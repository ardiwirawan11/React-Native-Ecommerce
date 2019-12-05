import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { Container, Content, Form, Label, Input, Item, Text, Footer } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProduct } from '../redux/action/ProductAction'
import { getMyproduct } from '../redux/action/MyproductAction'


class addScreen extends Component {

    state = {
        name: '',
        price: '',
        stock: ''
    }

    static navigationOptions = {
        header: null
    }

    getMyproduct = async () => {
        const token = await AsyncStorage.getItem('@token');
        this.props.get_Myproduct(token);
    }
    async handleLogin() {
        const { name, price, stock } = this.state;
        const token = await AsyncStorage.getItem('@token');
        try {
            const apiLogin = await axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`bearer ${token}`
                },
                url: 'https://glints-tim8-e-commerce.herokuapp.com/api/products/',
                data: JSON.stringify({
                    name,
                    price,
                    stock
                })
            })
            console.log(apiLogin.data)
            if (apiLogin.data) {
                this.props.get_Product()
                this.getMyproduct()
                this.props.navigation.navigate('Home')
                this.setState({ name: '', price: '', stock: '' })
            }
        }
        catch (e) {
            console.log(e)
            ToastAndroid.show('Please update to merchant first', ToastAndroid.SHORT)
        }
    }
    

    render() {
       return (
            <Container>
                <Content>
                    <Form style={styles.form}>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Price</Label>
                            <Input
                                onChangeText={(price) => this.setState({ price })}
                                value={this.state.price}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Stock</Label>
                            <Input
                                onChangeText={(stock) => this.setState({ stock })}
                                value={this.state.stock}
                            />
                        </Item>
                    </Form>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handleLogin()}
                        >
                            <Text style={styles.buttonText}>Masuk</Text>
                        </TouchableOpacity>

                    </View>

                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    signupTextCont: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5
    },
    signupText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15
    },
    signupButton: {
        color: '#57BC90',
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        width: 300,
        backgroundColor: '#57BC90',
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center'
    },
    form: {
        justifyContent: 'center',
        width: '70%',
        marginLeft: 50
    },
    label: {
        color: '#015249'
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#015249'
    }
});
const mapStateToProps = state => ({
    login: state.login
});
const mapDispatchToProps = dispatch => {
    return {
        get_Product: () => dispatch(getProduct()),
        get_Myproduct: (token) => dispatch(getMyproduct(token))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(addScreen)