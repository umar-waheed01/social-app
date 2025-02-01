// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'

// const RichTextEditor = ({editorRef, onChange}) => {
//   return (
//     <View style={{minHeight:285}}>
//       <RichToolbar 
//       actions = {[
//         actions.insertImage,
//         actions.setBold,
//         actions.setItalic,
//         actions.insertBulletsList,
//         actions.insertOrderedList,
//         actions.insertLink,
//         actions.keyboard,
//         actions.setStrikethrough,
//         actions.setUnderline,
//         actions.removeFormat,
//         actions.insertVideo,
//         actions.checkboxList,
//         actions.undo,
//         actions.redo,
//         actions.heading1,
//         actions.heading4
//       ]}
//       iconMap = {{
//         [actions.heading1] : ({tintColor}) => <Text style={{color:tintColor}}>H1</Text>,
//         [actions.heading4] : ({tintColor}) => <Text style={{color:tintColor}}>H4</Text>
//       }}
//       style={styles.richBar}
//       flatContainerStyle = {styles.flatStyle}
//       selectedIconTint={"gray"}
//       editor = {editorRef}
//       disable={false}
//       />

//       <RichEditor 
//         ref= {editorRef}
//         containerStyle={styles.rich}
//         editorStyle={styles.contentStyle}
//         placeholder={"what's on your mind"}
//         onChange={onChange}
//       />
//     </View>
//   )
// }

// export default RichTextEditor

// const styles = StyleSheet.create({
//     richBar:{
//         backgroundColor:'lightgrey',
//         borderTopRightRadius:10,
//         borderTopLeftRadius:10
//     },
//     rich:{
//         minHeight:240,
//         flex:1,
//         borderWidth:1.5,
//         borderTopWidth:0,
//         borderBottomLeftRadius:10,
//         borderBottomRightRadius:10,
//         borderColor:'gray',
//         padding:5
//     },
//     contentStyle:{
//         placeholderColor:'gray',
//         color:'black'
//     },
//     flatStyle:{
//         paddingHorizontal:8,
//         gap:3
//     }
// })

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'

const RichTextEditor = ({ editorRef, onChange }) => {
  return (
    <View style={{ minHeight: 285,marginTop:10 }}>
      <RichToolbar
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.keyboard,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.removeFormat,
          actions.insertVideo,
          actions.checkboxList,
          actions.undo,
          actions.redo,
          actions.heading1,
          actions.heading4
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>,
          [actions.heading4]: ({ tintColor }) => <Text style={{ color: tintColor }}>H4</Text>
        }}
        style={styles.richBar}
        flatContainerStyle={styles.flatStyle}
        selectedIconTint={"gray"}
        editor={editorRef}
        disable={false}
      />

      <RichEditor
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={styles.contentStyle}
        placeholder={"what's on your mind"}
        onChange={onChange}
      />
    </View>
  )
}

export default RichTextEditor

const styles = StyleSheet.create({
  richBar: {
    backgroundColor: 'lightgrey',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  rich: {
    minHeight: 240,
    flex: 1,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'gray', // Fixed the error
    padding: 5
  },
  contentStyle: {
    placeholderColor: 'gray',
    color: 'black'
  },
  flatStyle: {
    paddingHorizontal: 8,
    gap: 3
  }
})
