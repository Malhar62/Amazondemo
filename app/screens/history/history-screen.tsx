import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, Image, ImageBackground, Animated } from "react-native"
import { Header } from "../../components"
import { useNavigation, useIsFocused, CommonActions } from "@react-navigation/native"
import { useStores } from "../../models"
import { TouchableOpacity } from "react-native"


export const HistoryScreen = observer(function HistoryScreen() {
  // Pull in one of our MST stores
  const { characterStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const longines = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (isFocused) {
      Animated.spring(longines, {
        toValue: 1,
        tension: 20,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);
  const length = React.useRef(new Animated.Value(0)).current;
  const HEADER_MAX_HEIGHT = 70;
  const HEADER_MIN_HEIGHT = 40;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  var delayValue = 500;
  function Together(item) {
    delayValue = delayValue + 1000;
    const translateX = longines.interpolate({
      inputRange: [0, 1],
      outputRange: [delayValue, 1],
    });
    return (
      <Animated.View style={{ flexDirection: 'row', marginTop: 20, width: 350, transform: [{ translateX }], }}>
        <TouchableOpacity onPress={() =>
          // console.log('*******id : ' + item.id + '****index  : ' + item.index)}
          navigation.navigate('dashboard', { screen: 'third', params: { id: item.id, index: item.index, name: item.name, title: item.title, flag: 'history', icon: item.icon } })}
        //navigation.navigate('third', { id: item.id, index: item.index, name: item.name, title: item.title, flag: 'history', icon: item.icon })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: item.icon }} style={{ width: 60, height: 60, borderRadius: 30 }} />
            <Text style={{ fontSize: 20, color: '#fff' }}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }
  return (
    <ImageBackground source={require('../demo/mainback.png')} style={{ flex: 1 }}>
      <Header
        headerText={'HISTORY'}
        rightIcon={'menu1'}
        leftIcon={'back'}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => characterStore.deleteAll()}
      />
      <Animated.View style={{ marginTop: HEADER_MIN_HEIGHT }}>
        <Animated.Image
          source={{ uri: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png' }}
          style={{
            width: 80, height: 80, borderRadius: 40, alignSelf: 'center',
            transform: [{
              translateX: length.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [0, -80],
                extrapolate: 'clamp',
              }),
            }, {
              translateY: length.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [0, -20],
                extrapolate: 'clamp',
              }),
            }]
          }}
        />
        <Animated.Text style={{
          fontSize: 20, alignSelf: 'center', color: '#fff',
          transform: [{
            translateX: length.interpolate({
              inputRange: [0, HEADER_SCROLL_DISTANCE],
              outputRange: [0, 80],
              extrapolate: 'clamp',
            }),
          }, {
            translateY: length.interpolate({
              inputRange: [0, HEADER_SCROLL_DISTANCE],
              outputRange: [0, -80],
              extrapolate: 'clamp',
            }),
          }]
        }}>HISTORY</Animated.Text>
      </Animated.View>
      <View style={{ marginTop: HEADER_MAX_HEIGHT, height: 500 }}>
        <FlatList
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: length } } },
          ], { useNativeDriver: false })}
          showsVerticalScrollIndicator={false}
          data={characterStore.histories.toJSON()}
          renderItem={({ item }) => (
            Together(item)
          )}
          keyExtractor={index => index.toString()}
        />
      </View>
    </ImageBackground>
  )
})
