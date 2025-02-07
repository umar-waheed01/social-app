// import React, { useState, useCallback, useEffect } from "react";
// import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Button,ActivityIndicator } from "react-native";
// import InputField from "../../UiComponents/InputField/InputField";
// import CustomButton from "../../UiComponents/CustomButton/CustomButton";
// import { useNavigation } from "@react-navigation/native";
// import { styles } from './style'
// import { supabase } from "../../../supabase";
// import * as WebBrowser from 'expo-web-browser';
// import { useOAuth, useAuth, useUser } from '@clerk/clerk-expo';
// import * as Linking from 'expo-linking';


// const useWarmUpBrowser = () => {
//   React.useEffect(() => {
//     WebBrowser.warmUpAsync();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// WebBrowser.maybeCompleteAuthSession();


// const Login = () => {
//   const navigation = useNavigation();
//   useWarmUpBrowser();  
//   const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
//   const { user } = useUser();
//   const { isSignedIn } = useAuth();
//   const [loader, setLoader] = useState(false);

//   const onPress = useCallback(async () => {
//     setLoader(true);
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL('/dashboard'),
//       });

//       if (createdSessionId && setActive) {
//         setActive({ session: createdSessionId });
//       }
//     } catch (err) {
//       console.error('OAuth error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [startOAuthFlow]);

//   useEffect(() => {
//     if (isSignedIn) {
//       console.log('User is signed in:', user);
//       navigation.navigate('Dashboard');  
//     }
//   }, [isSignedIn]);

//   // Use state for email and password
//   const [email, setEmail] = useState("umar009@gmail.com");
//   const [password, setPassword] = useState("098098098");

//   const [loading, setLoading] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const validateFields = (email, password) => {
//     let valid = true;

//     if (!email) {
//       setEmailError("Email is required!");
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Invalid email format!");
//       valid = false;
//     } else {
//       setEmailError("");
//     }

//     if (!password) {
//       setPasswordError("Password is required!");
//       valid = false;
//     } else if (password.length < 8) {
//       setPasswordError("Password should be at least 8 characters long!");
//       valid = false;
//     } else {
//       setPasswordError("");
//     }

//     return valid;
//   };

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     if (!validateFields(email, password)) return;

//     setLoading(true);

//     try {
//       // Sign in using Supabase's auth method
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });

//       if (error) {
//         Alert.alert("Login Failed", error.message);
//       } else if (data) {
//         Alert.alert("Success", "You have logged in successfully!");
        
//         navigation.navigate("Dashboard"); 
//       }
//     } catch (err) {
//       Alert.alert("Error", "An unexpected error occurred. Please try again.");
//     } finally {
//       setLoader(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Image source={require("../../../assets/honk.png")} style={styles.headerImage} />
//         </View>

//         <Text style={styles.title}>Honk</Text>
//         <Text style={styles.subtitle}>Where Connections Speak Louder!</Text>

//         <InputField
//           label={"Email"}
//           placeholder={"Enter your email"}
//           value={email}  // Use state variable for value
//           onChangeText={(value) => setEmail(value)}  // Update state when input changes
//           keyboardType="email-address"
//           error_msg={emailError}
//         />

//         <InputField
//           label={"Password"}
//           placeholder={"Enter your password"}
//           value={password}  // Use state variable for value
//           onChangeText={(value) => setPassword(value)}  // Update state when input changes
//           secureTextEntry={true}
//           error_msg={passwordError}
//         />

//         <TouchableOpacity>
//           <Text style={styles.forgotText} onPress={() => navigation.navigate("ForgotPassword")}>
//             Forgot Password?
//           </Text>
//         </TouchableOpacity>

//         <CustomButton
//           title={"LOGIN"}
//           onPress={handleLogin}
//           loading={loading}
//           variant="contained"
//           style={{ marginTop: 10 }}
//         />
//         <CustomButton
//           title={"SIGN UP"}
//           onPress={() => navigation.navigate("SignUp")}
//           variant="outlined"
//           style={{ marginTop: 10 }}
//         />
//       </ScrollView>

//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome to MyApp</Text>
//       {loader ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : (
//         <Button title="Sign in with Google" onPress={onPress} />
//       )}
//     </View>
//     </View>
//   );
// };

// export default Login;


import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Button } from "react-native";
import InputField from "../../UiComponents/InputField/InputField";
import CustomButton from "../../UiComponents/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { styles } from './style';
import { supabase } from "../../../supabase";
import * as WebBrowser from 'expo-web-browser';
import { useOAuth, useAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from 'expo-linking';

const useWarmUpBrowser = () => {
  React.useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();
  useWarmUpBrowser();  
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const [loader, setLoader] = useState(false);

  const onPress = useCallback(async () => {
    setLoader(true);
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard'),
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error:', err);
    } finally {
      setLoader(false);
    }
  }, [startOAuthFlow]);

  useEffect(() => {
    if (isSignedIn) {
      console.log('User is signed in:', user);
      navigation.navigate('Dashboard');  
    }
  }, [isSignedIn, user]);

  const [email, setEmail] = useState("umar009@gmail.com");
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
          <Image source={require("../../../assets/honk.png")} style={styles.headerImage} />
        </View>

        <Text style={styles.title}>Honk</Text>
        <Text style={styles.subtitle}>Where Connections Speak Louder!</Text>

        <InputField
          label={"Email"}
          placeholder={"Enter your email"}
          value={email}
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
          error_msg={emailError}
        />

        <InputField
          label={"Password"}
          placeholder={"Enter your password"}
          value={password}
          onChangeText={(value) => setPassword(value)}
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
         
         <View style={{flexDirection:'row'}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          {loader ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <CustomButton title="Sign in with Google" onPress={onPress} variant="outlined" />
          )}
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          {loader ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <CustomButton title="Sign in with Facebook" variant="outlined" />
          )}
        </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Login;
