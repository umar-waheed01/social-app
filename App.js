import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { AuthProvider } from './src/context/AuthContext'; 
import { ClerkProvider } from '@clerk/clerk-expo';
import Dashboard from './src/components/Dashboard';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login/Login';
import SignUp from './src/screens/SignUp/SignUp';
import Notifications from './src/screens/Notifications';
import Createpost from './src/screens/Createpost';
import profile from './src/screens/profile';
import EditProfile from './src/components/EditProfile';

const Stack = createNativeStackNavigator();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_c2hpbmluZy1idWNrLTczLmNsZXJrLmFjY291bnRzLmRldiQ';
console.log("++++++++",publishableKey)
if (!publishableKey || publishableKey === 'pk_test_c2hpbmluZy1idWNrLTczLmNsZXJrLmFjY291bnRzLmRldiQ') {
  console.warn('Warning: Missing Clerk Publishable Key!');
}

export default function App() {
  return (
    <AuthProvider>
      <ClerkProvider publishableKey={publishableKey}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="CreatePost" component={Createpost} />
          <Stack.Screen name="Profile" component={profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  </AuthProvider> 
  );
}
