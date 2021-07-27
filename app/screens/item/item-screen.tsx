import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, TouchableOpacity, FlatList, Image, TextStyle, ViewStyle, ActivityIndicator } from "react-native"
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { Header, HeaderCommon, RangeSlider } from "../../components"
import { typography } from "../../theme"
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { HEIGHT, WIDTH } from "../../theme/scale"
import { useState } from "react"

const TEXT: TextStyle = { fontSize: 20, alignSelf: 'center', marginTop: HEIGHT(5) }
const MODAL: ViewStyle = { width: '100%', height: HEIGHT(120), backgroundColor: 'white', justifyContent: 'space-between', borderTopEndRadius: 10, borderTopStartRadius: 10, position: 'absolute', bottom: -10 }
const VIEW: ViewStyle = { height: 150, width: '100%', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: '#f1f1f1' }

export const ItemScreen = observer(function ItemScreen() {
  // Pull in one of our MST stores
  const { shoppingStore, cartStore } = useStores()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const route = useRoute<any>()
  const [load, setLoad] = React.useState<boolean>();
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [flag, setFlag] = React.useState<boolean>(false)
  const [part, setPart] = useState<boolean>(false)
  const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(start)

  React.useEffect(() => {
    if (isFocused) {
      if (route.params.name != '') {
        setLoad(true)
        shoppingStore.getCategoryItem(route.params.name)
        setLoad(false)
      }
    }
  }, [isFocused])

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
            <FlatList
              data={shoppingStore.items}
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
            />}
        </View>}
      </View>
      {route.params.name != '' && <View>
        <Modal isVisible={isModalVisible}>
          <View style={MODAL}>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              setFlag(true)
              setStart(0)
              setEnd(start)
            }}>
              <Text style={TEXT}>{'-Sort by range -'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                shoppingStore.sortUp();
                navigation.navigate('itemlist')
              }}>
              <Text style={TEXT}>{'- Price Low to High -'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              shoppingStore.sortDown();
              navigation.navigate('itemlist')
            }}><Text style={TEXT}>{'- Price High to Low -'}</Text></TouchableOpacity>

          </View>
        </Modal>
      </View>}
      {route.params.name != '' && <View>
        <RangeSlider
          onComplete={(min, max) => {
            setPart(false)
            setFlag(false)
            shoppingStore.sortRange(min, max)
          }}
          flag={flag}
          part={part}
          set_Part={() => { setPart(true); setEnd(start) }}
          start={start}
          end={end}
          set_start={(data) => setStart(data)}
          set_end={(data) => setEnd(data)}
        />
      </View>}
    </View>
  )
})
