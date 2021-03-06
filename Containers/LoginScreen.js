import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  function onAuthStateChanged(user) {
    if (user && user._user.email) {
      setUser(user._user.email);
      navigation.navigate('HomeScreen', {
        user: user._user.email,
      });
    }
  }

  function signUp() {
    navigation.navigate('SignupScreen');
  }

  function signIn() {
    auth()
      .signInWithEmailAndPassword(user, password)
      .then(({user}) => {
        setUser(user._user.email);
        navigation.navigate('HomeScreen', {
          user: user._user.email,
        });
      });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const TextInputs = ({onChangeText, type}) => {
    return (
      <TextInput
        autoCapitalize="none"
        secureTextEntry={type === 'email' ? false : true}
        placeholder={type}
        style={styles.textInputStyle}
        onChangeText={onChangeText}
      />
    );
  };

  const Buttons = ({type, style, action}) => {
    return (
      <TouchableOpacity style={style} onPress={action}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          {type}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAwareScrollView
      style={{flexGrow: 1, width: '100%', backgroundColor: 'white'}}
      contentContainerStyle={styles.mainContainer}>
      <Image
        source={require('../img/logo.jpeg')}
        style={{
          height: 128,
          alignSelf: 'flex-start',
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: 'rgb(112,86,251)',
          marginBottom: '10%',
        }}>
        {'Quill'}
      </Text>
      {TextInputs({
        onChangeText: text => {
          setUser(text);
        },
        type: 'email',
      })}
      {TextInputs({
        onChangeText: text => {
          setPassword(text);
        },
        type: 'password',
      })}
      <Buttons
        action={() => signIn()}
        style={styles.buttonStyle}
        type={'Login'}
      />
      <Buttons
        action={() => signUp()}
        style={styles.buttonStyleSignUp}
        type={'Sign-Up'}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    marginVertical: 2.5,
    width: '70%',
    height: 40,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonStyle: {
    marginTop: '25%',
    width: '70%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(218,44,112)',
    borderRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonStyleSignUp: {
    marginVertical: 15,
    width: '70%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(150,17,253)',
    borderRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
export default LoginScreen;
