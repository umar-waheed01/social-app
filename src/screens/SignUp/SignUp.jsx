import React, { useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import InputField from "../../UiComponents/InputField/InputField.jsx";
import CustomButton from "../../UiComponents/CustomButton/CustomButton.jsx";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../supabase.js";
import { styles } from "./style.js";

const SignUp = () => {
  const navigation = useNavigation();
  
  // Form state for fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors state
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle SignUp
  const handleSignUp = async () => {
    if (!validateFields(name, email, password, confirmPassword)) return;
  
    setLoading(true);
  
    try {
      const { data:{session}, error } = await supabase.auth.signUp({
        email,
        password,
        options:{
          data:{
            name
          }
        }
      });
  
      if (error) {
        console.error("Supabase error: ", error); // Log the error
        Alert.alert("Error", error.message);
      } else {
        console.log("SignUp data:", data); // Log the response data
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Dashboard"); // Redirect to dashboard after successful signup
      }
    } catch (error) {
      console.error("Unexpected error: ", error); // Log unexpected errors
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
          <Image source={require("../../../assets/images/honk.png")} style={styles.headerLogo} />
        </View>

        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>
          Before you can continue, we need some basic information.
        </Text>

        {/* Name Input Field */}
        <InputField
          label={"Name"}
          placeholder={"Enter your name"}
          onChangeText={(value) => setName(value)} // Using setState here
          error_msg={nameError}
        />

        {/* Email Input Field */}
        <InputField
          label={"Email"}
          placeholder={"Enter your email"}
          onChangeText={(value) => setEmail(value)} // Using setState here
          error_msg={emailError}
        />

        {/* Password Input Field */}
        <InputField
          label={"Password"}
          placeholder={"Enter password"}
          onChangeText={(value) => setPassword(value)} // Using setState here
          secureTextEntry={true}
          error_msg={passwordError}
        />

        {/* Confirm Password Input Field */}
        <InputField
          label={"Confirm password"}
          placeholder={"Please confirm your password"}
          onChangeText={(value) => setConfirmPassword(value)} // Using setState here
          secureTextEntry={true}
          error_msg={confirmPasswordError}
        />

        {/* Sign Up Button */}
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
