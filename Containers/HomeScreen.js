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

const {width} = Dimensions.get('window');

const HomeScreen = ({route, navigation}) => {
  const {user: user} = route.params;
  const [initializing, setInitializing] = useState(true);
  const [search, setSearch] = useState('');
  const [comment, setComment] = useState('');
  const [reading, setReading] = useState(null);

  const [data, setData] = useState([
    {
      createdBy: 'Mohsen',
      category: 'Comedy',
      title: 'Story One',
      description: 'This text describes the content of the story.',
      story: 'This Story',
      image: require('../img/story.jpeg'),
      likes: false,
      comments: [],
    },
    {
      createdBy: user,
      category: 'Sci-fi',
      title: 'Story One',
      description: 'This text describes the content of the story.',
      story: 'This Story',
      image: require('../img/story.jpeg'),
      likes: false,
      comments: [],
    },
    {
      createdBy: user,
      category: 'Action',
      title: 'Story One',
      description: 'This text describes the content of the story.',
      story: 'This Story',
      image: require('../img/story.jpeg'),
      likes: false,
      comments: [],
    },
    {
      createdBy: 'Mohsen',
      category: 'Drama',
      title: 'Story One',
      description: 'This text describes the content of the story.',
      story: 'This Story',
      image: require('../img/story.jpeg'),
      likes: false,
      comments: [],
    },
  ]);

  useEffect(() => {}, []);
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
    <View style={{flexGrow: 1, width: '100%', backgroundColor: 'white'}}>
      {!reading ? (
        <>
          <TextInput
            onChangeText={text => setSearch(text)}
            placeholder={'Category Search...'}
            style={{
              borderColor: '#9611fd',
              width: '90%',
              height: 40,
              alignSelf: 'center',
              borderRadius: 10,
              borderWidth: 2,
              marginVertical: 5,
              padding: 5,
            }}
          />
          <FlatList
            data={
              search === ''
                ? data
                : data.filter(a => a.category.includes(search))
            }
            style={{flex: 1, width: '100%', paddingVertical: 5}}
            contentContainerStyle={{
              paddingVertical: 15,
              flexGrow: 1,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            ItemSeparatorComponent={() => {
              return <View style={{width: '100%', height: 5}} />;
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setReading({
                      story: item.story,
                      title: item.title,
                      comments: item.comments,
                    });
                  }}
                  style={{
                    width: width * 0.9,
                    justifyContent: 'flex-start',
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
                  <View
                    style={{
                      width: '100%',
                      padding: 10,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
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
                      <Text style={{fontSize: 16, width: 200}}>
                        {item.description}
                      </Text>
                    </View>

                    {user === item.createdBy && (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ProfileScreen', {
                            user: user,
                            data: data,
                            edit: true,
                            dataIndex: index,
                          });
                        }}
                        style={{
                          width: 35,
                          height: 35,
                          position: 'absolute',
                          top: 15,
                          right: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{width: 25, height: 25, resizeMode: 'contain'}}
                          source={require('../img/edit.png')}
                        />
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: '#9611fd',
                          }}>
                          {'Edit'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }}>
                    <TextInput
                      onChangeText={text => setComment(text)}
                      placeholder={'Comment'}
                      style={{
                        borderColor: '#9611fd',
                        width: '80%',
                        height: 40,
                        marginLeft: 10,
                        alignSelf: 'flex-start',
                        borderRadius: 10,
                        borderWidth: 2,
                        marginVertical: 5,
                        padding: 5,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        if (comment != '') {
                          item.comments.push({
                            commentBy: user,
                            comment: comment,
                          });
                          setComment('');
                        }
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        backgroundColor: '#9611fd',
                        borderRadius: 17.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: 25, height: 25, resizeMode: 'contain'}}
                        source={require('../img/done.png')}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      paddingHorizontal: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#9611fd',
                      }}>
                      {item.comments.length > 0
                        ? `${item.comments.length} Comments`
                        : ''}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        item.likes = !item.likes;
                        setInitializing(!initializing);
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: 35, height: 35, resizeMode: 'contain'}}
                        source={
                          item.likes
                            ? require('../img/liked.png')
                            : require('../img/like.png')
                        }
                      />
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: '#9611fd',
                        }}>
                        {item.likes ? 'liked' : 'like'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <Buttons
            action={() => {
              navigation.navigate('ProfileScreen', {
                data: data,
                user: user,
              });
            }}
            style={styles.buttonStyleSignUp}
            type={'Create Post'}
          />
        </>
      ) : (
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          style={{
            width: '100%',
            flexGrow: 1,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#9611fd',
              alignSelf: 'center',
              width: '90%',
              textAlign: 'center',
              marginVertical: 15,
            }}>
            {reading.title}
          </Text>
          <Text
            style={{
              marginBottom: 15,
              alignSelf: 'center',
              width: '90%',
              textAlign: 'left',
              fontSize: 16,
            }}>
            {reading.story}
          </Text>
          {reading.comments.length > 0 && (
            <View
              style={{height: 150, width: '100%', alignItems: 'flex-start'}}>
              <Text
                style={{
                  left: 10,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#9611fd',
                  textAlign: 'center',
                }}>
                {'Comments'}
              </Text>
              <FlatList
                horizontal
                data={reading.comments}
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
                        justifyContent: 'flex-start',
                        width: width * 0.8,
                        padding: 5,
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
                          marginBottom: 10,
                          fontWeight: 'bold',
                          color: '#9611fd',
                          alignSelf: 'flex-start',
                          textAlign: 'center',
                        }}>
                        {item.commentBy}
                      </Text>
                      <Text>{item.comment}</Text>
                    </View>
                  );
                }}
              />
            </View>
          )}
          <Buttons
            action={() => {
              setReading(null);
            }}
            style={styles.buttonStyleSignUp}
            type={'Done'}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
});
export default HomeScreen;
