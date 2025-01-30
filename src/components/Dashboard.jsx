// import React, { useEffect } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

// import HomeScreen from '../screens/Home'; 
// import { Platform } from 'react-native';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { supabase } from '../../supabase';

// const Tab = createBottomTabNavigator();

// const userCredentials = () => {
//     return (
//         <AuthProvider>
//             <Dashboard />
//         </AuthProvider>
//     )
// }

// const Dashboard = () => {
//   const {setAuth} = useAuth();

//   useEffect(()=>{
//     supabase.auth.onAuthStateChange((_event,session)=>{
//       console.log("session user", session?.user);
//       if(session){
//         setAuth(session?.user)
//       }else{
//         setAuth(null)
//       }
//     })
//   },[])

//   return (
//     <>
//      <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarActiveTintColor: "#7f0f82",
//           tabBarInactiveTintColor: "black",
//           tabBarStyle: {
//             height: Platform.OS === "ios" ? 70 : 60,
//             paddingBottom: Platform.OS === "ios" ? 20 : 5,
//           },
//         }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//       </Tab.Navigator>
//     </>
//   );
// }

// export default Dashboard;


import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeScreen from '../screens/Home'; 
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; 
import { supabase } from '../../supabase';
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from "@expo/vector-icons/Ionicons";
import Search from '../screens/Search';
import Createpost from '../screens/Createpost';
import Reels from '../screens/Reels';
import profile from '../screens/profile';
import Avatar from './Avatar';


const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const { setAuth } = useAuth();
  const Navigation = useNavigation();


  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session user", session?.user);
      if (session) {
        setAuth(session?.user); 
        updateUserData(session?.user)
      } else {
        setAuth(null); 
        Navigation.navigate("Login")
      }
    });
  },[]);

  const updateUserData =async (user) =>{
    let res = await getuserData(user?.id)
    console.log("got user data",res)
  }

  return (
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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: () => (
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                Home
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={24}
                color={focused ? "#7f0f82" : "black"}
                style={{ marginBottom: Platform.OS === "ios" ? -5 : 0 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: () => (
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                Search
              </Text>
            ),
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                name="search"
                size={24}
                color={focused ? "#7f0f82" : "black"}
                style={{ marginBottom: Platform.OS === "ios" ? -5 : 0 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreatePost"
          component={Createpost}
          options={{
            tabBarLabel: () => (
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                 Post
              </Text>
            ),
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ focused }) => (
              <Feather
              name="plus-square"
                size={24}
                color={focused ? "#7f0f82" : "black"}
                style={{ marginBottom: Platform.OS === "ios" ? -5 : 0 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Reels"
          component={Reels}
          options={{
            tabBarLabel: () => (
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Sofia-Pro-Medium",
                }}
              >
                Reels
              </Text>
            ),
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="video-collection"
                size={24}
                color={focused ? "#7f0f82" : "black"}
                style={{ marginBottom: Platform.OS === "ios" ? -5 : 0 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={profile}
          options={{
            tabBarLabel: () => (
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                Profile
              </Text>
            ),
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ focused }) => (
              // <FontAwesome
              //   name="user"
              //   size={24}
              //   color={focused ? "#7f0f82" : "black"}
              //   style={{ marginBottom: Platform.OS === "ios" ? -5 : 0 }}
              // />
          <Avatar size={26} rounded={20} color={focused ? "#7f0f82" : "black"} style={{ marginBottom: Platform.OS === "ios" ? -5 : 0 }}/> 

            ),
          }}
        />
      </Tab.Navigator>
  );
}

export default Dashboard;
