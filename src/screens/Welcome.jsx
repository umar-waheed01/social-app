import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../UiComponents/CustomButton/CustomButton';

const WelcomeScreen = () => {
  const Navigation = useNavigation();

  const handleGetStarted = () => {
    Navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Image 
          source={require('../../assets/images/welcome.png')}
          style={styles.image}
        />
        
        <Text style={styles.title}>Welcome to HONK!</Text>
        <Text style={styles.subtitle}>Your journey starts here</Text>
        
        <View style={styles.buttonContainer}>
        <CustomButton
          title="Get Started"
          onPress={handleGetStarted}
        />
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', 
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 400,  
    height: 400, 
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#777',
    marginTop: 10,
  },
  buttonContainer:{
    marginTop:30,
  },
  buttonStyle: {
    backgroundColor: '#FF5722',
  },
  buttonTextStyle: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;

