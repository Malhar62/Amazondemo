import React from "react"
import { observer } from "mobx-react-lite"
import { Text, View, TouchableOpacity, FlatList, Image, Button, ViewStyle } from "react-native"
import { Header, HeaderCommon } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { DrawerActions } from "@react-navigation/native"
import { typography } from "../../theme"
//import ImageSlider from 'react-native-image-slider';
import { SliderBox } from "react-native-image-slider-box";
import { HEIGHT, WIDTH } from "../../theme/scale"
export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { shoppingStore, cartStore } = useStores()
  const isFocused = useIsFocused()
  const SCROLL = React.createRef<FlatList>()

  React.useEffect(() => {
    if (isFocused) {
      shoppingStore.getShop()
      SCROLL.current.scrollToOffset({ animated: true, offset: 0 })
    }
  }, [isFocused])
  // Pull in navigation via hook
  const VIEW: ViewStyle = { backgroundColor: shoppingStore.dark ? 'black' : '#f0daec', height: 150, width: '100%', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: '#f1f1f1', marginTop: 10 }

  const navigation = useNavigation()
  let DATA = [
    { img: 'data:image/jpeg;base64,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' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nMAmjn5zQB0_kn4B10DclLJfNtcoRXunFA&usqp=CAU' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqLSpo9H4FJ3q6CjePv2o8Tnp6a5b7qhIatQ&usqp=CAU' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSznZEoBK-Zft8J-5olgDUcqRGwWQ8diZyU5Q&usqp=CAU' },
  ]
  let DATA1 = [
    'https://image.shutterstock.com/image-illustration/set-white-home-appliances-on-260nw-692475616.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbCLvjPsRwN96cD_-mKKxCXEYmEqissPDm3A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAqpTBs_pvnU0ZnnRJYPdmplUZpUzmEdPJQQ&usqp=CAU',
    'data:image/jpeg;base64,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'
  ]
  function TopSlider() {
    return (
      <View>
        <View style={{ height: HEIGHT(251), marginTop: 10, borderTopWidth: 1 }}>
          <SliderBox
            images={DATA1}
            sliderBoxHeight={250}
            autoplay
            circleloop
            onCurrentImagePressed={(index: any) => console.log(`image ${index} pressed`)}
            dotColor="blue"
            inactiveDotColor="#90A4AE"
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontFamily: typography.code, alignSelf: 'center', color: shoppingStore.dark ? '#fff' : 'black' }} >- Recently Viewed -</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>
      <HeaderCommon
        LEFT={'menu1'}
        RIGHT={'cart'}
        onLeft={() => {
          navigation.dispatch(DrawerActions.openDrawer())
        }}
        onRight={() => navigation.navigate('cart')}
      />
      <View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={shoppingStore.categories}
          renderItem={({ item, index }) => (
            <View style={{ marginLeft: 15, height: 100, justifyContent: 'center', borderWidth: 0 }}>
              <TouchableOpacity onPress={() => {
                // console.log(item)
                navigation.navigate('itemlist', { name: item })
              }}>
                <Image source={{ uri: DATA[index].img }} style={{ alignSelf: 'center', borderWidth: 0, width: 60, height: 60, borderRadius: 30, borderColor: 'black' }} />
                <Text style={{ fontSize: 18, fontFamily: typography.primary, color: shoppingStore.dark ? '#fff' : 'black' }}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item}
        />
      </View>

      <View style={{ height: HEIGHT(590) }}>
        <FlatList
          ref={SCROLL}
          data={cartStore.visited}
          renderItem={({ item, index }) => (
            <View style={VIEW}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image source={{ uri: item.image }} style={{ width: WIDTH(100), height: 100 }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('itemdetail', { user: item })}>
                    <Text style={{ fontSize: 20, fontFamily: typography.primary, color: shoppingStore.dark ? '#fff' : 'black' }}>{item.title}</Text>
                    <Text style={{ color: 'grey', fontSize: 15 }}>{item.category}</Text>
                    <Text style={{ fontSize: 18, color: shoppingStore.dark ? '#fff' : 'black' }}>Rs.{item.price}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.title}
          ListHeaderComponent={<TopSlider />}
        />
      </View>
    </View>
  )
})
