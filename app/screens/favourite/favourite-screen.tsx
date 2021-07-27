import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, TouchableOpacity, Image, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Header, HeaderCommon } from "../../components"
import { HEIGHT, WIDTH } from "../../theme/scale"
import Entypo from 'react-native-vector-icons/Entypo'
export const FavouriteScreen = observer(function FavouriteScreen() {
  // Pull in one of our MST stores
  const { cartStore, shoppingStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>

      <HeaderCommon
        LEFT={'back'}
        RIGHT={'cart'}
        onLeft={() => {
          navigation.goBack();
        }}
        onRight={() => navigation.navigate('cart')}
      />
      <View>
        <FlatList
          data={cartStore.favs.toJSON()}
          renderItem={({ item, index }) => (
            <View style={{ height: 200, borderBottomWidth: 1, marginTop: 10, marginHorizontal: 5, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image source={{ uri: item.image }} style={{ width: WIDTH(120), height: 130 }} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('itemdetail', { user: item })}>
                  <View style={{ marginLeft: 10, width: WIDTH(250), justifyContent: 'space-between', height: HEIGHT(130) }}>
                    <Text style={{ fontSize: 17, color: shoppingStore.dark ? '#fff' : 'black' }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 20, color: shoppingStore.dark ? '#fff' : 'black' }}>Rs.{item.price}</Text>
                      <Button title='move to cart' onPress={() => {
                        let obj = { item, index }
                        cartStore.moveToCart(obj)
                      }} />
                      <Entypo name='cross' size={30} onPress={() => cartStore.removeFav(index)} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  )
})
