import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';


const Header = ({title,showBackButton = false , mb = 10}) => {
    const Navigation = useNavigation()
  return (
    <View style={styles.container}>
        {
            showBackButton && (
                <Pressable style={styles.showBackButton} onPress={()=> Navigation.goBack()}> 
                <Ionicons name="chevron-back" size={30} color="black" />
                </Pressable>
            )
        }
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        padding:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
        gap:10
    },
    title:{
        fontSize:22,
        fontWeight:'500',
        color:'black'
        
    },
    showBackButton: {
        position: 'absolute', 
        left:0
      },
})
export default Header
