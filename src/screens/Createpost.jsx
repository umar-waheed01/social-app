import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import { color } from '@rneui/themed/dist/config'
import Avatar from '../components/Avatar'
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import RichTextEditor from '../components/RichTextEditor'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomButton from '../UiComponents/CustomButton/CustomButton'
import * as ImagePicker from 'expo-image-picker';
import { getSupabaseFileUrl } from '../../services/ImageService'
import { Video } from 'expo-av'
import { createDrUpdatePost } from '../../services/PostService'

const Createpost = () => {
  const {user} = useAuth()
  const bodyRef = useRef("")
  const editorRef = useRef("")
  const Navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(file)

  const onPick = async (isImage) =>{
      let mediaConfig ={
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
    }
    if (!isImage) {
      mediaConfig.mediaTypes = ImagePicker.MediaTypeOptions.Videos
    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig)
    console.log('file',result.assets[0])
    if (!result.canceled){
      setFile(result.assets[0])
    }
  }

  const isLocalFile = file =>{
    if(!file) return null;
    if(typeof file == 'object') return true;
    
    return false
  }

  const getFileType = file =>{
    if(!file) return null;
    if(isLocalFile(file)){
      return file.type
    }
    if(file.includes('postImages')){
      return 'image'
    }
    return 'videos'
  }

  const getFileUri = file =>{
      if(!file) return null;
      if(isLocalFile(file)){
        return file.uri
      }
      return getSupabaseFileUrl(file)?.uri;
  }

  const onSubmit = async () =>{
    if(!bodyRef.current && !file){
      Alert.alert("Post", "Please choose an image or add post body")
      return
    }
    let data = {
      file,
      body: bodyRef.current,
      userId: user?.id
    }

    setLoading(true)
    let res = await createDrUpdatePost(data)
    setLoading(false)
    console.log('post res: ', res)
    if(res.success){
      setFile(null);
      bodyRef.current = '';
      editorRef.current?.setContentHTML('');
      Navigation.goBack();
    }else{
      Alert.alert('post',res.msg)
    }

  }

  return (
    <View style={styles.container}>
      <Header title={"Create Post"}/>

      <ScrollView style={{gap:20}}>
        <View style={styles.header}>
          <Avatar
            uri={user?.image}
            size={100}
            rounded={50}
          />
          <View style={{gap:2}}>
            <Text style={styles.userName}>
              {
                user && user?.user_metadata?.name 
              }
            </Text>
            <Text style={styles.publicText}>
              Public
            </Text>
          </View>
        </View>

        <View style={styles.textEditor}>
          <RichTextEditor editorRef={editorRef} onChange={body =>bodyRef.current = body } />
        </View>

        {
          file && (
            <View style={styles.file}>
              {
                getFileType(file) == 'video' ? (
                  <Video 
                     style={{flex:1}}
                     source={{
                      uri: getFileUri(file)
                     }}
                     useNativeControls
                     resizeMode='cover'
                     isLooping
                  />
                ):(
                  <Image source={{uri: getFileUri(file)}} resizeMode='cover' style={{flex:1}} />
                )
              }
              
              <TouchableOpacity style={styles.closeIcon} onPress={()=> setFile(null)}>
              <MaterialCommunityIcons name="delete-alert-outline" size={22} color="white" />
                
              </TouchableOpacity>

            </View>
          )
        }
        
        <View style={styles.media}>
          <Text style={styles.addImageText}>Add to your post</Text>
          <View style={styles.mediaIcons}>

            <TouchableOpacity onPress={()=>onPick(true)}>
              <FontAwesome6 name="image" size={28} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>onPick(false)}>
              <FontAwesome6 name="video" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomButton 
        title={"POST"}
        loading={loading}
        onPress={onSubmit}
      />
    </View>
  )
}

export default Createpost

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    gap:15,
    marginBottom:30,
  },
  closeIcon:{
    position:'absolute',
    top:10,
    right:10,
    backgroundColor:'rgba(255,0,0,0.6)',
    padding:7,
    borderRadius:50
  },
  video:{

  },
  file:{
    height:300,
    width:'100%',
    borderRadius:20,
    overflow:'hidden',
    marginTop:10,
  },
  imageIcon:{
    borderRadius:30,
  },
  addImageText:{
    fontSize:20,
    fontWeight:'bold',
    color:'black', 
  },
  mediaIcons:{
    flexDirection:'row',
    alignItems:'center',
    gap:15,
  },
  media:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10,
    borderWidth:1.5,
    padding:12,
    paddingHorizontal:18,
    borderRadius:50,
    borderColor:'gray', 
  },
  textEditor:{
    // marginTop:10,
  },
  publicText:{
    fontSize:16, 
  fontWeight:300,
  color:'gray',
  },
  avatar:{
    height:50,
    width:50,
    borderRadius:50, 
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  },
  userName:{
    fontSize:22,
    fontWeight:'bold',
    color:'black'
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    gap:12, 
  },
  title:{
    // marginBottom:10,
    fontSize:25,
    fontWeight:30,
    color:'black',
    textAlign:'center',
    marginBottom:30
  }
})