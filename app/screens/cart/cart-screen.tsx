import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Header, HeaderCommon } from "../../components"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { HEIGHT, WIDTH } from "../../theme/scale"
import Modal from 'react-native-modal';
import { multiply } from "ramda"

export const CartScreen = observer(function CartScreen() {
  // Pull in one of our MST stores
  const { cartStore, shoppingStore } = useStores()
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

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
        data={cartStore.carts.toJSON()}
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
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', width: WIDTH(100), justifyContent: 'space-between', backgroundColor: '#87b0c9', borderRadius: 0 }}>
                      <MaterialCommunityIcons name={item.quantity == 1 ? 'delete' : 'minus'} size={30} onPress={() => {
                        if (item.quantity == 1) {
                          cartStore.removeFromCart(index)
                        } else {
                          let obj = { item, index };
                          cartStore.removeQuantity(obj)
                        }
                      }} />
                      <Text style={{ fontSize: 22 }}>{item.quantity}</Text>
                      <MaterialCommunityIcons name='plus' size={30}
                        onPress={() => {
                          let obj = { item, index };
                          cartStore.addQuantity(obj)
                        }}
                      />
                    </View>
                    <View style={{ marginLeft: 10, backgroundColor: 'green' }}>
                      <TouchableOpacity onPress={() => cartStore.saveForLater(item)}>
                        <Text style={{ fontSize: 18, color: '#fff' }}>SAVE FOR LATER</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={index => index.toString()}
      />
      <View style={{ bottom: 10, height: 40, backgroundColor: 'orange', justifyContent: 'center', marginHorizontal: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('userinfo')}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 5, color: '#fff' }}>Total Amount: Rs.{cartStore.amount}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal isVisible={isModalVisible}>
          <View style={{ backgroundColor: '#fff' }}>
            <FlatList
              data={cartStore.carts}
              renderItem={({ item, index }) => (
                <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                  <Text style={{ fontSize: 17 }}>{item.title}</Text>
                  <Text style={{ fontSize: 17 }}>x{item.quantity}</Text>
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Rs.{multiply(item.price, item.quantity)}</Text>
                </View>
              )}
            />
          </View>
          <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 17 }}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  )
})
