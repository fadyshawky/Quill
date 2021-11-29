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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [data, setData] = useState([
    {
      title: 'Story One',
      Description: 'This text describes the content of the story.',
      image: require('../img/story.jpeg'),
    },
  ]);

  useEffect(() => {}, []);

  return (
    <View style={{flexGrow: 1, width: '100%', backgroundColor: 'white'}}>
      <FlatList
        data={data}
        style={{flex: 1, width: '100%', paddingVertical: 5}}
        contentContainerStyle={{
          flexGrow: 1,
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: width * 0.9,
                padding: 10,
                justifyContent: 'flex-start',
                flexDirection: 'row',
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
              <Image
                style={{
                  width: '30%',
                  maxHeight: 200,
                  resizeMode: 'contain',
                  marginRight: 20,
                }}
                source={item.image}
              />
              <View style={{justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {item.title}
                </Text>
                <Text style={{fontSize: 16, width: '70%'}}>
                  {item.Description}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
