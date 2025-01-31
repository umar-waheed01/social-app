import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../UiComponents/CustomButton/CustomButton'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../../supabase'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import Avatar from '../components/Avatar'

const Home = () => {
  const Navigation = useNavigation()
    const { user, setAuth } = useAuth();
    console.log("UserHome+++++++++++++++",user)
  
  // const { user, setAuth } = useAuth()
  // console.log("User",user)

  // const handleLogout =async () =>{
  //   const {error} = await supabase.auth.signOut()
  //   if(error){
  //     Alert.alert("SignOut","Error Signing Out")
  //   }
  // }
  return (
    // <View style={styles.container}>
    //   <Text>Home</Text>
    //   <CustomButton title="Logout" onPress={handleLogout} />
    // </View>
    <View style={styles.container}>
      <View style={styles.header}> 
        <Text style={styles.title}>HONK</Text>
        <View style={styles.icons}>

          <Pressable onPress={()=>Navigation.navigate("Notifications")} >
          <AntDesign name="hearto" size={24} color="black" />
          </Pressable>

          <Pressable  onPress={()=>Navigation.navigate("CreatePost")}>
          <Feather name="plus-square" size={24} color="black" />
          </Pressable>

          <Pressable onPress={()=>Navigation.navigate("Profile")} >
          <Avatar size={28} rounded={20}
          uri={user?.user_metadata?.image} 
          /> 
          </Pressable>

        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },
  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    marginBottom:10,
    marginHorizontal:10,
  },
  title:{
    color:'black',
    fontSize:30,
    fontWeight:"bold",
  },
  AvatarImage:{
    height:30,
    width:30,
    borderRadius:50,
    borderCurve:'continuous',
    borderColor:'gray',
    borderWidth:3,
  },
  pillText:{
    color:'white',
    fontSize:24,
    fontWeight:'bold'
  },
  pill:{
    position:'absolute',
    right:-10,
    top:-4,
    height:20,
    width:20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    backgroundColor:'red',
  },
  noPosts:{
    fontSize:24,
    textAlign:'center',
    color:'gray',
  },
  listStyle:{
    paddingTop:20,
    paddingHorizontal:20,
  },
  icons:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    gap:18,
  }

})