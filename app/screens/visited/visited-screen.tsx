import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Header, HeaderCommon } from "../../components"
import { typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"


export const VisitedScreen = observer(function VisitedScreen() {
  // Pull in one of our MST stores
  const { shoppingStore } = useStores()
  const VIEW: ViewStyle = { height: 150, width: '100%', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: '#f1f1f1' }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>
      <HeaderCommon
        LEFT={'back'}
        RIGHT={'cart'}
        onLeft={() => {
          navigation.goBack()
          shoppingStore.deleteSearch()
        }}
        onRight={() => navigation.navigate('cart')}
      />

      <View style={{ justifyContent: 'center', height: 40, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
        <Text style={{ marginLeft: 10, fontSize: 20, color: shoppingStore.dark ? '#fff' : 'black' }}> {shoppingStore.searches.length} Results</Text>
      </View>
      {shoppingStore.searches.length == 0 && <View>
        <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily: typography.primary, color: shoppingStore.dark ? '#fff' : 'black' }}>No Results found !</Text>
      </View>}
      <View>
        <FlatList
          data={shoppingStore.searches}
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
          keyExtractor={item => item.id}
        />
      </View>
    </View>

  )
})
