import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system'
import { supabase } from '../supabase'

export const getUserImageSrc = imagePath =>{
    if(imagePath){
        return {uri:imagePath}
    }else{
        return require("../assets/images/defaultUser.png")
    }
}

export const getSupabaseFileUrl = filePath =>{
    if(filePath){
        
    }
}

export const uploadFile = async (folderName, fileUri, isImage = true) =>{
    try{
        let fileName = getFilePath(folderName, isImage);
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

        let imageData = decode(fileBase64);
        let {data, error} = await supabase.storage.from('uploads').upload(fileName, imageData, {
            cacheControl: '3600',
            upsert: true,
            contentType:isImage? 'image/*' : 'video/*'
        });
        if(error){
            return {success: false, msg: 'could not upload media' }
        }
        console.log("file upload success", data);
        return { success: true, data: data.path}
    }catch(error){
        console.log("file upload error", error);
        return { success: false, msg:'could not upload media'}
    }
}

export const getFilePath = (folderName, isImage ) => {
    return `/${folderName}/${(new Date()).getTime()}${isImage ? '.png' : '.mp4'}`
}