import React, { Component } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class cekScreen extends Component {

    cekLogin = async() => {
        const token = await AsyncStorage.getItem('@token');
        if (token) {
            return this.props.navigation.navigate('Home')
        } else {
            return this.props.navigation.navigate('Login')
        }
    }

    componentDidMount() {
        this.cekLogin();
      }
    render() {
        return (
            <View>

            </View>
        )
    }
}
