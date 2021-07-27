import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, Text, TouchableOpacity, Image } from "react-native"
import { Header, HeaderCommon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { HEIGHT, WIDTH } from "../../theme/scale"


export const OrderScreen = observer(function OrderScreen() {
  // Pull in one of our MST stores
  const { cartStore, shoppingStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>
      <HeaderCommon
        LEFT={'back'}
        onLeft={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={cartStore.orders.toJSON()}
        renderItem={({ item, index }) => (
          <View style={{ height: 200, borderBottomWidth: 1, marginTop: 10, marginHorizontal: 5, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image source={{ uri: item.image }} style={{ width: WIDTH(120), height: 130 }} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('itemdetail', { user: item })}>
                <View style={{ marginLeft: 10, width: WIDTH(250), justifyContent: 'space-between', height: HEIGHT(130) }}>
                  <Text style={{ fontSize: 17, color: shoppingStore.dark ? '#fff' : 'black' }}>{item.title}</Text>
                  <Text style={{ fontSize: 20, marginTop: 10, color: shoppingStore.dark ? '#fff' : 'black' }}>Rs.{item.price}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={index => index.toString()}
      />
    </View>
  )
})
