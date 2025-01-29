import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import InputField from "../../UiComponents/InputField/InputField";
import CustomButton from "../../UiComponents/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { styles } from './style'
import { supabase } from "../../../supabase";

const Login = () => {
  const navigation = useNavigation();

  // Use state for email and password
  const [email, setEmail] = useState("umar05@gmail.com");
  const [password, setPassword] = useState("098098098");

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateFields = (email, password) => {
    let valid = true;

    if (!email) {
      setEmailError("Email is required!");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format!");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required!");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long!");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateFields(email, password)) return;

    setLoading(true);

    try {
      // Sign in using Supabase's auth method
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Login Failed", error.message);
      } else if (data) {
        Alert.alert("Success", "You have logged in successfully!");
        
        navigation.navigate("Dashboard"); 
      }
    } catch (err) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={require("../../../assets/images/honk.png")} style={styles.headerImage} />
        </View>

        <Text style={styles.title}>Honk</Text>
        <Text style={styles.subtitle}>Where Connections Speak Louder!</Text>

        <InputField
          label={"Email"}
          placeholder={"Enter your email"}
          value={email}  // Use state variable for value
          onChangeText={(value) => setEmail(value)}  // Update state when input changes
          keyboardType="email-address"
          error_msg={emailError}
        />

        <InputField
          label={"Password"}
          placeholder={"Enter your password"}
          value={password}  // Use state variable for value
          onChangeText={(value) => setPassword(value)}  // Update state when input changes
          secureTextEntry={true}
          error_msg={passwordError}
        />

        <TouchableOpacity>
          <Text style={styles.forgotText} onPress={() => navigation.navigate("ForgotPassword")}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <CustomButton
          title={"LOGIN"}
          onPress={handleLogin}
          loading={loading}
          variant="contained"
          style={{ marginTop: 10 }}
        />
        <CustomButton
          title={"SIGN UP"}
          onPress={() => navigation.navigate("SignUp")}
          variant="outlined"
          style={{ marginTop: 10 }}
        />
      </ScrollView>
    </View>
  );
};

export default Login;
