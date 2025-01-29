import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

import HomeScreen from '../screens/Home'; 
import { Platform } from 'react-native';
import { AuthProvider } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const userCredentials = () => {
    return (
        <AuthProvider>
            <Dashboard />
        </AuthProvider>
    )
}

const Dashboard = () => {
  return (
    <>
     <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#7f0f82",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            height: Platform.OS === "ios" ? 70 : 60,
            paddingBottom: Platform.OS === "ios" ? 20 : 5,
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </>
  );
}

export default Dashboard;