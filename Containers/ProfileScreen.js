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
  FlatList,
  View,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');

const ProfileScreen = ({route, navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [story, setStory] = useState();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();

  const {
    user: user,
    data: data,
    dataIndex: dataIndex,
    edit: edit,
  } = route.params;
  console.log('%c⧭', 'color: #731d6d', data);

  useEffect(() => {
    if (edit) {
      setStory(data[dataIndex].story);
      setDescription(data[dataIndex].description);
      setTitle(data[dataIndex].title);
      setCategory(data[dataIndex].category);
    }
  }, []);

  const Buttons = ({type, style, action}) => {
    return (
      <TouchableOpacity style={style} onPress={action}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          {type}
        </Text>
      </TouchableOpacity>
    );
  };

  const TextInputs = ({onChangeText, type, value}) => {
    return (
      <TextInput
        value={value}
        autoCapitalize="none"
        placeholder={type}
        style={styles.textInputStyle}
        onChangeText={onChangeText}
        multiline
      />
    );
  };

  const TitleInputs = ({onChangeText, type, value}) => {
    return (
      <TextInput
        value={value}
        autoCapitalize="none"
        placeholder={type}
        style={styles.titleInputStyle}
        onChangeText={onChangeText}
        multiline
      />
    );
  };

  return (
    <KeyboardAwareScrollView
      style={{flexGrow: 1, width: '100%', backgroundColor: 'white'}}
      contentContainerStyle={styles.mainContainer}>
      {TitleInputs({
        onChangeText: text => {
          setTitle(text);
        },
        type: 'Title',
        value: title,
      })}
      {TitleInputs({
        onChangeText: text => {
          setCategory(text);
        },
        value: category,
        type: 'Category',
      })}
      {TextInputs({
        onChangeText: text => {
          setDescription(text);
        },
        value: description,
        type: 'Description',
      })}
      {TextInputs({
        onChangeText: text => {
          setStory(text);
        },
        value: story,
        type: 'Story',
      })}
      {data.length > 0 && (
        <View
          style={{
            marginVertical: 10,
            height: 150,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              left: 20,
              fontSize: 14,
              fontWeight: 'bold',
              color: '#9611fd',
              textAlign: 'center',
            }}>
            {'My Stories'}
          </Text>
          <FlatList
            horizontal
            data={data.filter(a => a.createdBy === user)}
            style={{
              flexGrow: 1,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}
            ItemSeparatorComponent={() => {
              return <View style={{height: '100%', width: 5}} />;
            }}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width * 0.8,
                    minHeight: 100,
                    backgroundColor: 'white',
                    shadowOffset: {
                      height: 5,
                      width: 5,
                    },
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#9611fd',
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      )}
      <Buttons
        action={() => {
          if (edit) {
            data[dataIndex].user = user;
            data[dataIndex].category = category;
            data[dataIndex].title = title;
            data[dataIndex].description = description;
            data[dataIndex].story = story;
            navigation.navigate('HomeScreen', {
              user: user,
              updatedData: data,
            });
          } else {
            data.push({
              createdBy: user,
              category: category,
              title: title,
              description: description,
              story: story,
              image: require('../img/story.jpeg'),
              likes: 0,
              comments: [],
            });
            navigation.navigate('HomeScreen', {
              updatedData: data,
            });
          }
        }}
        style={styles.buttonStyleSignUp}
        type={edit ? 'Save' : 'Create'}
      />
      <Buttons
        action={() => {
          auth()
            .signOut()
            .then(() => {
              navigation.navigate('LoginScreen');
            });
        }}
        style={styles.buttonStyleSignUp}
        type={'Sign Out'}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    paddingVertical: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonStyleSignUp: {
    alignSelf: 'center',
    marginVertical: 15,
    width: '70%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9611fd',
    borderRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  textInputStyle: {
    alignSelf: 'center',
    marginVertical: 2.5,
    width: '90%',
    height: 150,
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
  titleInputStyle: {
    alignSelf: 'center',
    marginVertical: 2.5,
    width: '90%',
    height: 50,
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
});
export default ProfileScreen;
