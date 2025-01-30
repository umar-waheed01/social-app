import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { supabase } from '../../supabase';

const Profile = () => {
  const { user, setAuth } = useAuth();

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
          onPress:()=> onLogout(),
          style: 'destructive',
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <UserHeader user={user} handleLogout={handleLogout} />
    </View>
  );
};

const UserHeader = ({ user, handleLogout }) => {
  return (
    <View style={styles.headerContainer}>
      <Header title="Profile" showBackButton={true} />
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome6 name="power-off" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    position: 'relative',
  },
  logoutButton: {
    position: 'absolute',
    right: 10,
    top: 20,
    padding: 10,
    backgroundColor: 'red',
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
    gap: 10,
  },
  userName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  editIcon: {
    position: 'absolute',
    right: -12,
    bottom: 0,
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  avatarContainer: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  headerShape: {
    width: 100,
    height: 100,
  },
});

export default Profile;
