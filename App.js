import React from 'react';
import {Root} from 'native-base';
import { Provider } from 'react-redux';
import configureStore from './store';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import cartScreen from './src/components/cartScreen';
import profileScreen from './src/components/profileScreen';
import registerScreen from './src/components/registerScreen';
import loginScreen from './src/components/loginScreen';
import homeScreen from './src/components/homeScreen';
import cekScreen from './src/components/cekScreen';
import addScreen from './src/components/addScreen';
import detailScreen from './src/components/detailScreen';


export default class App extends React.Component {
  static navigationOptions = {
    header: null
  }


  render() {
    const store = configureStore();
    return (
      <Root>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </Root>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: homeScreen,
    Login: loginScreen,
    Register: registerScreen,
    Profil: profileScreen,
    Cart: cartScreen,
    Cek: cekScreen,
    Add: addScreen,
    Detail: detailScreen
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);