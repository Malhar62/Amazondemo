import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { HeaderCommon } from "../../components"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { HEIGHT, WIDTH } from "../../theme/scale"
import { useState } from "react"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Mode from './Mode'
import Comp from "./Comp"
import Comp1 from "./Comp1"
import { typography } from "../../theme"

export const ItemScreen = observer(function ItemScreen() {
  // Pull in one of our MST stores
  const { shoppingStore } = useStores()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const route = useRoute<any>()
  const [load, setLoad] = React.useState<boolean>();
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [grid, setGrid] = useState<boolean>(false)


  React.useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setLoad(true)
        shoppingStore.getCategoryItem(route.params.name)
        setLoad(false)
        setGrid(route.params ? false : grid)
      }
    }
  }, [isFocused])



  function BOTTOM() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('rated', { NAME: route.params.name })}>
          <View elevation={5} style={{ backgroundColor: '#f1f1f1', flexDirection: 'row', borderWidth: 0, justifyContent: 'center', alignItems: 'center', width: '90%', height: 50, alignSelf: 'center', marginTop: 10 }}>
            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'gold', borderColor: 'pink', justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name='star' color='#fff' size={20} />
            </View>
            <Text style={{ marginLeft: 5, fontSize: 20, alignSelf: 'center', fontFamily: typography.code }}>Top Rated Products </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          key={grid ? 1 : 0}
          numColumns={grid ? 2 : 1}
          showsVerticalScrollIndicator={false}
          data={grid ? shoppingStore.items.slice() : shoppingStore.items}
          renderItem={({ item, index }) => (
            <Comp1 item={item} index={index} grid={grid} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>
      <HeaderCommon
        LEFT={'back'}
        RIGHT={'cart'}
        onLeft={() => {
          shoppingStore.deleteSearch()
          navigation.goBack()
        }}
        onRight={() => navigation.navigate('cart')}
      />
      <View>
        <View style={{ justifyContent: 'center', height: 40, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


            {(shoppingStore.isLoading == false) ?
              <Text style={{ marginLeft: 10, fontSize: 20, color: shoppingStore.dark ? '#fff' : 'black' }}>{shoppingStore.items.length} Results</Text>
              : <Text style={{ marginLeft: 10, fontSize: 20, color: shoppingStore.dark ? '#fff' : 'black' }}> 0 Results</Text>
            }
            <FontAwesome name='sort' color={shoppingStore.dark ? '#fff' : 'black'} size={25} onPress={() => setModalVisible(true)} style={{ right: 10 }} />
          </View>
        </View>
        {route.params.name == '' && <Text>No Results !</Text>}
        {route.params.name != '' && <View style={{ height: HEIGHT(650), backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>
          {shoppingStore.isLoading &&
            <View style={{ flexDirection: 'row', height: 200, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size='large' color="#0000ff" />
              <Text style={{ fontSize: 20, marginLeft: 10, color: shoppingStore.dark ? '#fff' : 'black' }}>Loading...</Text>
            </View>}
          {load == false && shoppingStore.isLoading == false &&
            <View>
              <FlatList
                key={grid ? 1 : 0}
                numColumns={grid ? 2 : 1}
                showsVerticalScrollIndicator={false}
                data={grid ? shoppingStore.items.slice() : shoppingStore.items}
                renderItem={({ item, index }) => (
                  <Comp item={item} index={index} grid={grid} />
                )}
                keyExtractor={item => item.id}
                ListFooterComponent={<BOTTOM />}
              />
            </View>
          }
        </View>}
        <View elevation={5} style={{ justifyContent: 'center', alignItems: 'center', height: 45, width: 45, borderRadius: 45 / 2, backgroundColor: '#e3ded1', position: 'absolute', right: 20, bottom: 20 }}>
          <Ionicons name={grid ? 'grid-sharp' : 'grid-outline'} color={'black'} size={25} onPress={() => setGrid(!grid)} />
        </View>
      </View>
      <Mode
        isModalVisible={isModalVisible}
        falsing={() => setModalVisible(false)}
      />
    </View>
  )
})
/**  {(index == ((shoppingStore.items.length / 2) - 1)) && <View style={{ width: 500, backgroundColor: 'pink' }}>
                      <Text>Top Rated Products</Text>
                    </View>} */