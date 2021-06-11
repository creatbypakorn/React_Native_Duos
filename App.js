
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Home from './src/Home';



const Navigator = createStackNavigator({
    Home: { screen: Home }
});
const App = createAppContainer(Navigator);

export default App;