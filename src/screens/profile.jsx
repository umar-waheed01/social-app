import { StyleSheet, Text, TouchableOpacity, View, Alert, Pressable } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { supabase } from '../../supabase';
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const { user, setAuth } = useAuth();
  const Navigation = useNavigation();
  console.log("userProfile+++++++++++", user);

  // Signout function
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("SignOut", "Error Signing Out");
    } else {
      // Optional: handle post logout (e.g., navigate to login screen)
    }
  };

  // Handle Logout with confirmation
  const handleLogout = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to logout?",
      [
        {
          text: 'Cancel',
          onPress: () => console.log("Cancel"),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => onLogout(),
          style: 'destructive',
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" handleLogout={handleLogout} style={{marginBottom: 20}} />
      
      <View style={styles.content}>
        <View style={{gap:15}}>

          <View style={styles.avatarContainer}>
            <Avatar
               size={100}
               rounded={50}
               uri={user?.user_metadata?.image}
            />
            <Pressable style={styles.editIcon} onPress={() => Navigation.navigate('EditProfile')}>
              <FontAwesome6 name="pen" size={18} color="black" />
            </Pressable>
          </View>

          <View style={{gap:4, alignItems:'center'}}>
            <Text style={styles.userName}>{user && user?.user_metadata?.name}</Text>
            <Text style={styles.userName}>{user && user?.address}</Text>
          </View>

        </View>

        <View style={{gap:10}}>
            <View style={styles.info}>
               <FontAwesome6 name="envelope" size={22} color="black" />
               <Text style={styles.infoText}>{user && user?.email}</Text>
            </View>
        </View>

        {
         user && user?.phoneNumber &&
          <View style={{gap:10}}>
            <View style={styles.info}>
               <FontAwesome6 name="phone" size={22} color="black" />
               <Text style={styles.infoText}>{user && user?.phoneNumber}</Text>
            </View>
          </View>
        }

        {
         user && user?.bio && (
            <Text style={styles.infoText}>{user && user?.user_metadata.bio}</Text>
        )
          
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  avatarContainer: {
    // alignSelf: 'center',
    // width: 50,
    // height: 50,
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  infoText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'flex-start',
    gap: 10,
  },
  userName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
});

export default Profile;
