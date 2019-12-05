import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { Container, Content, Form, Label, Input, Item, Text, Footer } from 'native-base'
import axios from 'axios'

class registerScreen extends Component {

    state = {
        email: '',
        name: '',
        password: ''
    }

    static navigationOptions = {
        header: null
    }
    async handleLogin() {
        const { name, email, password } = this.state;
        try {
            const apiRegister = await axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization':'TOKEN'
                },
                url: 'https://glints-tim8-e-commerce.herokuapp.com/api/users/',
                data: JSON.stringify({
                    email,
                    name,
                    password
                })
            })
            console.log(apiRegister.data)
            if (apiRegister.data) {
                ToastAndroid.show('Register Success', ToastAndroid.SHORT)
                this.props.navigation.navigate('Login')
                this.setState({ email: '', name: '', password: '' })
            }
        }
        catch (e) {
            console.log(e)
            ToastAndroid.show('User already registered, contact your administrator for information', ToastAndroid.SHORT)
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
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                    </View>

                </Content>
                <Footer>
                    <Text style={styles.signupText}>Sudah punya akun? </Text>
                    <Text style={styles.signupText} onPress={() => { this.props.navigation.navigate('Login') }}>SignIn</Text>
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

export default registerScreen