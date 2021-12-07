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

const SignupScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [Phone, setPhoneNumber] = useState();
  const [birthDate, setBirthDate] = useState();

  function onAuthStateChanged(user) {
    if (user._user.email) {
      setUser(user._user.email);
      navigation.navigate('HomeScreen', {
        user: user._user.email,
      });
    }
  }

  function signUp() {
    auth()
      .createUserWithEmailAndPassword(user, password)
      .then(() => {
        Alert.alert('Yayy!!!', 'Welcome on board...');
        firestore().collection('Users').doc(user).set({
          phone: Phone,
          birthDate: birthDate,
        });
        firestore().collection('Stories').doc(user).set({
          Written: [],
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Ooops!!!', 'That email address is already in use!');
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Ooops!!!', 'That email address is invalid!');
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  function signIn() {
    navigation.navigate('LoginScreen');
  }

  useEffect(() => {}, []);

  const TextInputs = ({onChangeText, type}) => {
    return (
      <TextInput
        autoCapitalize="none"
        secureTextEntry={type === 'password' ? true : false}
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
      {TextInputs({
        onChangeText: text => {
          setPhoneNumber(text);
        },
        type: 'Phone',
      })}
      {TextInputs({
        onChangeText: text => {
          setBirthDate(text);
        },
        type: 'birthDate',
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
export default SignupScreen;
