import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import Dashboard from './src/components/Dashboard';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login/Login';
import SignUp from './src/screens/SignUp/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Dashboard" component={Dashboard} />        
        <Stack.Screen name="Login" component={Login} />        
        <Stack.Screen name="SignUp" component={SignUp} />        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
