import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import reducer from './src/reducers/index';
import ListPlayers from './src/components/ListPlayers';
import { API_BASE_URL } from './src/constants/api';
import HomeScreen from './src/components/HomeScreen';
import EditGame from './src/components/EditGame';
import ShowGame from './src/components/ShowGame';
import CompleteGame from './src/components/CompleteGame';
import NewGame from './src/components/NewGame';

const client = axios.create({
    baseURL: API_BASE_URL,
    responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Players: ListPlayers,
    EditGame: EditGame,
    NewGame: NewGame,
    ShowGame: ShowGame,
    CompleteGame: CompleteGame,
}, {
    initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    navigator: AppContainer;

    handleNavigationChange = (prevState, newState, action) => {
        console.log('handleNavigationChange', prevState, newState, action);
    };

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AppContainer
                        onNavigationStateChange={this.handleNavigationChange}
                        uriPrefix="/app"
                        ref={nav => {
                            this.navigator = nav;
                        }}
                    />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50
    }
});

