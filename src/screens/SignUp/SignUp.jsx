import React, { useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import InputField from "../../UiComponents/InputField/InputField.jsx";
import CustomButton from "../../UiComponents/CustomButton/CustomButton.jsx";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../supabase.js";
import { styles } from "./style.js";

const SignUp = () => {
  const navigation = useNavigation();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!validateFields(name, email, password, confirmPassword)) return;
  
    setLoading(true);
  
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options:{
          data:{
            name
          }
        }
      });

      const user = data?.user;
      console.log("&&&&&&&&&&",data?.user)

      if (user) {
        const { error: dbError } = await supabase.from('users').insert([
          {
            id: user.id, 
            email: email,
            name: name, 
            created_at: new Date(),
          },
        ]);
  
        if (dbError) {
          console.error('Database Insert Error:', dbError.message);
        } else {
          console.log('User stored successfully in users table');
        }
      }
  
      if (error) {
        console.error("Supabase error: ", error);
        Alert.alert("Error", error.message);
      } else {
        console.log("SignUp successfull:", data);
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Dashboard"); 
      }
    } catch (error) {
      console.error("Unexpected error: ", error); 
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const validateFields = (name, email, password, confirmPassword) => {
    let isValid = true;
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!name) {
      setNameError("Please enter your name.");
      isValid = false;
    }

    if (!email) {
      setEmailError("Please enter your email.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter a password.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.header}>
          <Image source={require("../../../assets/honk.png")} style={styles.headerLogo} />
        </View>

        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>
          Before you can continue, we need some basic information.
        </Text>

        <InputField
          label={"Name"}
          placeholder={"Enter your name"}
          onChangeText={(value) => setName(value)}
          error_msg={nameError}
        />

        {/* Email Input Field */}
        <InputField
          label={"Email"}
          placeholder={"Enter your email"}
          onChangeText={(value) => setEmail(value)} 
          error_msg={emailError}
        />

        {/* Password Input Field */}
        <InputField
          label={"Password"}
          placeholder={"Enter password"}
          onChangeText={(value) => setPassword(value)} 
          secureTextEntry={true}
          error_msg={passwordError}
        />

        <InputField
          label={"Confirm password"}
          placeholder={"Please confirm your password"}
          onChangeText={(value) => setConfirmPassword(value)} 
          secureTextEntry={true}
          error_msg={confirmPasswordError}
        />

        <CustomButton
          loading={loading}
          title={"Sign Up"}
          onPress={handleSignUp}
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

export default SignUp;
