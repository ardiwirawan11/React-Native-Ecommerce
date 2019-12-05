import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { Container, Content, Form, Label, Input, Item, Text, Footer } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { postLogin } from '../redux/action/LoginAction'
import { getProduct } from '../redux/action/ProductAction'
import { getMyproduct } from '../redux/action/MyproductAction'

class loginScreen extends Component {

    state = {
        email: '',
        password: ''
    }

    static navigationOptions = {
        header: null
    }

    getMyproduct = async () => {
        const token = await AsyncStorage.getItem('@token');
        this.props.get_Myproduct(token);
    }

    async handleLogin() {
        const { email, password } = this.state;
        try {
            const apiLogin = await axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization':'TOKEN'
                },
                url: 'https://glints-tim8-e-commerce.herokuapp.com/api/users/login/',
                data: JSON.stringify({
                    email,
                    password
                })
            })
            console.log(apiLogin.data)
            if (apiLogin.data) {
                await AsyncStorage.setItem('@token', apiLogin.data.token)
                console.log('asynctoken', await AsyncStorage.getItem('@token'))
                this.props.get_Product()
                this.getMyproduct()
                this.props.navigation.navigate('Home')
                this.setState({ email: '', password: '' })
            }
        }
        catch (e) {
            console.log(e)
            ToastAndroid.show('Wrong user name & password. Try again!', ToastAndroid.SHORT)
        }
    }
    // handleLogin = async () => {
    //     const data = {
    //         email: this.state.email,
    //         password: this.state.password
    //     }
    //     await this.props.postlogin(data)
    //     console.log('asynctoken', this.props.login)
    //     if (this.props.login.data.token) {
    //         console.log('asynctoken', this.props.login)
    //         await AsyncStorage.setItem('@token', this.props.login)
    //         console.log('asynctoken', await AsyncStorage.getItem('@token'))
    //         this.props.navigation.navigate('Home')
    //         this.setState({ email: '', password: '' })
    //     }
    //     else {
    //         ToastAndroid.show('Wrong user name & password. Try again!', ToastAndroid.SHORT)
    //     }
    // }

    render() {
        console.log('login token', this.props.login)
        return (
            <Container>
                <Content>
                    <Form style={styles.form}>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry={true}
                                value={this.state.password}
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
                <Footer>
                    <Text style={styles.signupText}>Belum punya akun? </Text>
                    <Text style={styles.signupText} onPress={() => { this.props.navigation.navigate('Register') }}>SignUp</Text>
                </Footer>
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
        postlogin: data => dispatch(postLogin(data)),
        get_Product: () => dispatch(getProduct()),
        get_Myproduct: (token) => dispatch(getMyproduct(token))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(loginScreen)