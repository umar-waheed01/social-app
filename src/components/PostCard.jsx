import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Avatar from './Avatar'

const PostCard = ({item, currentUser, Navigation, hasShadow = true}) => {
    const shadowStyles = {
            shadowOffset:{
                width:0,
                height:2,
            },
            shadowOpacity:0.06,
            shadowRadius:6,
            elevation:1
    }
    const createdAt = moment (item?.created_at).format('MMM D')
  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
    
        <View style={styles.userInfo}>
            <Avatar 
               size={100}
               rounded={50}
               uri={item?.user?.image}
            />

            <View style={{gap:2}}>
                <Text style={styles.userName}>{item?.user?.name} || umar</Text>
                <Text style={styles.postTime}>{createdAt} || 111</Text>
            </View>

        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        gap:10,
        marginBottom:15,
        borderRadius:50,
        padding:20,
        backgroundColor:'white',
        borderWidth:0.5,
        borderColor:'gray',
        shadowColor:'#000',
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    userInfo:{
        flexDirection:'row',
        alignItems:'center',
        gap:8,
    },
    userName:{
        fontSize:22,
        color:'gray',
        fontWeight:500,
    },
    postTime:{
        fontSize:20,
        color:'gray',
        fontWeight:'500',
    },
    content:{
        gap:10,
    },
    postMedia:{
        height:400,
        width:'100%',
        borderRadius:50,
    },
    postBody:{
        marginLeft:5,
    },
    foter:{
        flexDirection:'row',
        alignItems:'center',
        gap:15,
    },
    footerButton:{
        marginLeft:5,
        flexDirection:'row',
        alignItems:'center',
        gap:4,
    },
    actions:{
        flexDirection:'row',
        alignItems:'center',
        gap:18,
    },
    count:{
        color:'black',
        fontSize:22,
    }
})

export default PostCard
