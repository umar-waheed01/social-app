import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useAuth } from '../context/AuthContext'
import { getUserImageSrc } from '../../services/ImageService'
import Ionicons from '@expo/vector-icons/Ionicons';
import InputField from '../UiComponents/InputField/InputField'
import CustomButton from '../UiComponents/CustomButton/CustomButton'
import { updateUser } from '../../services/userService'
import * as ImagePicker from 'expo-image-picker';


const EditProfile = () => {

  const {user: currentUser, setUserData} = useAuth()

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name:'',
    phoneNumber:'',
    image:'',
    bio:'',
    address:''
  })

  useEffect(()=>{
    if(currentUser){
      setUser({
        name:currentUser?.user_metadata?.name,
        phoneNumber:currentUser?.user_metadata?.phoneNumber,
        image:currentUser?.user_metadata?.image,
        bio:currentUser?.user_metadata?.bio,
        address:currentUser?.user_metadata?.address
      })
    }
  },[currentUser])

  const imagrSource = user.image && typeof user.image == 'object' ?user.image.uri : getUserImageSrc(user?.image)

  const onPickImage =async () => {
    console.log("pick image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setUser({...user, image:result.assets[0].uri})
    }
  }

   const onSave = async () => {
    let userData ={...user};
    let {name, phoneNumber, image, bio, address} = userData;
    if(!name || !phoneNumber || !bio || !address || !image){
      Alert.alert('Please fill all the fields')
      return
      
    }
    setLoading(true)

    if(typeof image == 'object'){
      let imageRes = await uploadFile('profile', image?.uri, true)
      if(imageRes.success) userData.image = imageRes.data
      else userData.image = null;
    }

    // update user in supabase
      const res = await  updateUser(currentUser?.id, userData)
      setLoading(false)
      console.log("res+++", res);
      if(res?.success){
        setUserData(...currentUser, ...userData)
        Alert.alert('Profile Updated Successfully')
      }else{
        Alert.alert('Error Updating Profile')
      }
  }
 

  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1}}>
        <Header title="Edit Profile" />

        <View style={styles.form}>
          <View style={styles.avatarContainer}> 
            <Image source={imagrSource} style={styles.avatar}  />
            <Pressable style={styles.cameraIcon} onPress={onPickImage}>
              <Ionicons name="camera" size={20} color="black" />
            </Pressable>
          </View>
          <Text style={{fontSize:16, fontWeight:'400'}}>
            Pleaser Fill Your Profile Details
          </Text>

          <InputField placeholder="Enter Your Name" value={user?.name} onChangeText={value => setUser({...user, name:value})} />
          <InputField placeholder="Enter Your Phone Number" value={user?.phoneNumber} onChangeText={value => setUser({...user, phoneNumber:value})} />
          <InputField placeholder="Enter Your Address" value={user?.address} onChangeText={value => setUser({...user, address:value})} />
          <InputField placeholder="Enter Your bio" value={user?.bio} onChangeText={value => setUser({...user, bio:value})}  numberOfLines={6} multiline={true} />

          <CustomButton title="Update Profile" onPress={onSave} loading={loading} />
        </View>

      </ScrollView>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container:{
    flex:1, 
    padding:20, 
  },
  avatarContainer:{
    alignSelf:'center',
    width:120,
    height:120,
  },
  avatar:{
    width:120,
    height:120,
    borderRadius:60,
    borderWidth:1,
    borderColor:'#ccc',
  },
  cameraIcon:{
      position:'absolute',
    bottom:0,
    right:-10,
    backgroundColor:'white',
    padding:8,
    borderRadius:50,
    borderWidth:1,
    borderColor:'#ccc',
  },
  form:{
      marginTop:20,
    gap:18,
  },
  input:{
      borderWidth:1,
    borderColor:'#ccc',
    borderRadius:5,
    padding:17,
    fontSize:16,
    color:'#333',
    borderCurve:'continuous',
    gap:15,
    paddingHorizontal:20,
  },
  bio:{
      flexDirection:'row',
      alignItems:'flex-start',
      paddingVertical:15,
      height:100,
  }
})