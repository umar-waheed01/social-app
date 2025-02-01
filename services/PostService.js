import { supabase } from "../supabase";
import { uploadFile } from "./ImageService";

export const createDrUpdatePost = async (post) =>{
    try {
        if(post.file && typeof post.file == 'object'){
            let isImage = post?.file?.type == 'image';
            let folderName = isImage ? 'postImages' : 'postVideos';
            let fileResult = await uploadFile(folderName, post?.file?.uri, isImage)
            if(fileResult.success) post.file = fileResult.data;
            else{
                return fileResult
            }
        }

        const { data , error} = await supabase.from('posts').upsert(post).select().single();
        if(error){
            console.log("CreatePost error",error)
            return {success: false, msg :' could not create your post'}
        }
        return {success:true , data : data}
    }catch(error){
        console.log('createPost error: ', error )
        return {success: false, msg : 'could not create your post'}
    }
}

export const fetchPosts = async (limit = 10) =>{
    try {
        const {data, error} = await supabase.from('posts').select('*, user: users(id, name, image)').order("created_at", {ascending: false}).limit(limit);
       
        if(error){
            console.log('fetchPosts error: ',error)
            return {success: false, msg:'could not fetch the posts' }
        }
        return {success: true, data:data }
    }catch(error){
        console.log('fetchPosts error: ', error )
        return {success: false, msg : 'could not fetch the post'}
    }
}