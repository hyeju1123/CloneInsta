import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feed } from '../screens/Feed';

const Stack = createStackNavigator();

export const FeedNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="Feed" component={Feed} options={{ headerTitle: 'Social App' }}/>
        </Stack.Navigator>
    )
}

