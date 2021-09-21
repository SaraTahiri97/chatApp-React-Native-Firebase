import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../screens/ChatListScreen'
import CallListScreen from '../screens/CallListScreen'
import SignInScreen from '../screens/SignInScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ChatScreen from '../screens/ChatScreen'
import AddChat from '../screens/AddChat'
import Header from '../components/Header'
import colors from '../assets/colors/colors';

const TopTabs = createMaterialTopTabNavigator();
const NavigationStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const Tabs = () => {
    return (
        <TopTabs.Navigator
            screenOptions={{
                tabBarLabelStyle: {fontFamily: "Laila-Regular", },
                tabBarIndicatorStyle:{backgroundColor:colors.darkPurple},
                tabBarActiveTintColor: colors.darkPurple,
            }} >
            <TopTabs.Screen options={{title:"Chat"}} name="ChatList" component={ChatListScreen} />
            <TopTabs.Screen options={{title:"Calls"}} name="CallList" component={CallListScreen} />
        </TopTabs.Navigator>
    );
}
const Home = ({navigation}) => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
              options={{header: () => <Header navigation={navigation} icon1="star" icon2="search" />, headerStyle:{elevation:0} }}
            name="Tabs" component={Tabs} />
            <HomeStack.Screen options={{headerShown:false }}name="Chat" component={ChatScreen} />
            <HomeStack.Screen name="AddChat" component={AddChat} />
        </HomeStack.Navigator>
    )
}
const Navigation = () => {
    return (
        <NavigationStack.Navigator screenOptions={{ headerShown: false }} >
            <NavigationStack.Screen name="SignIn" component={SignInScreen} />
            <NavigationStack.Screen name="Register" component={RegisterScreen} />
            <NavigationStack.Screen name="Home" component={Home} />
        </NavigationStack.Navigator>
    )
}
const Main = () => {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>

    )
}

export default Main
