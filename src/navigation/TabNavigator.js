import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';

import { FeedNavigator } from './StackNavigator';
import Search from '../screens/Search';
import AddPost from '../screens/AddPost';
import Activity from '../screens/Activity';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        switch(route.name) {
                            case 'FeedNavigator':
                                iconName = 'home-outline';
                                break;
                            case 'Search':
                                iconName = 'search-outline';
                                break;
                            case 'AddPost':
                                iconName = 'plus-square-outline';
                                break;
                            case 'Activity':
                                iconName = 'heart-outline';
                                break;
                            case 'Profile':
                                iconName = 'person-outline';
                                break;
                        }
                        return <Icon 
                                    name={iconName}
                                    width={32}
                                    height={32}
                                    fill={focused ? '#111' : '#939393'}
                                />
                    }
                })}
                tabBarOptions={{ showLabel: false }}
            >
                <Tab.Screen name="FeedNavigator" component={FeedNavigator} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="AddPost" component={AddPost} />
                <Tab.Screen name="Activity" component={Activity} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );    
}

export default TabNavigator;