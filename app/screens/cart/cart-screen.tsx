import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Header, HeaderCommon } from "../../components"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { HEIGHT, WIDTH } from "../../theme/scale"
import Modal from 'react-native-modal';
import { countBy, multiply } from "ramda"
import { RadioButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
export const CartScreen = observer(function CartScreen() {
  // Pull in one of our MST stores
  const { cartStore, shoppingStore } = useStores()
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [isgift, setIsgift] = React.useState<boolean>(false);

  // Pull in navigation via hook
  const navigation = useNavigation()
  function countItems() {
    var count = 0;
    for (var i = 0; i < cartStore.carts.length; i++) {
      count = count + cartStore.carts[i].quantity
    }
    //console.log(count)
    return count;
  }

  return (
    <View style={{ flex: 1, backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>
      <HeaderCommon
        LEFT={'back'}
        onLeft={() => {
          navigation.goBack();
        }}
      />
      {/* <FlatList
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
    </View> */}

      <View style={{ borderBottomWidth: 1, borderBottomColor: '#d9d6c5', height: HEIGHT(190) }}>
        <Text style={{ fontSize: 23, marginHorizontal: 20 }}>Cart subtotal ({countItems()} items) : Rs.{cartStore.amount}</Text>
        <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 7 }}>
          <RadioButton
            value=''
            color='green'
            status={isgift ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsgift(!isgift)
              isgift ? cartStore.countAmount() : cartStore.gift()
            }}
          />
          <FontAwesome5 name='gift' size={30} style={{ marginLeft: 10 }} />
          <Text style={{ fontSize: 20, marginLeft: 5 }}>This order contains a gift</Text>
        </View>
        {isgift && <Text style={{ fontSize: 18, marginLeft: 15, color: 'green' }}>Added 10 rupees for gift in all Products</Text>}
        <View style={{
          marginTop: isgift ? 18 : 38, width: WIDTH(360), height: 60, backgroundColor: '#f2c862', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderRadius: 3
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('userinfo')}>
            <Text style={{ fontSize: 20 }}>Proceed to checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={cartStore.carts.toJSON()}
          renderItem={({ item, index }) => (
            <View style={{ height: 200, borderBottomWidth: 1, marginTop: 10, marginHorizontal: 5, justifyContent: 'center', borderBottomColor: '#d9d6c5' }}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image source={{ uri: item.image }} style={{ width: WIDTH(120), height: 130 }} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('itemdetail', { user: item })}>
                  <View style={{ marginLeft: 10, width: WIDTH(250), justifyContent: 'space-between', height: HEIGHT(130) }}>
                    <Text numberOfLines={2} style={{ fontSize: 20, color: shoppingStore.dark ? '#fff' : 'black' }}>{item.title}</Text>
                    <Text style={{ color: 'grey' }}>{item.category}</Text>
                    <Text style={{ fontSize: 20, marginTop: 10, color: shoppingStore.dark ? '#fff' : 'black' }}>Rs.{item.price}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: WIDTH(100), height: 40, backgroundColor: '#f1f1f1', borderWidth: 1, borderColor: '#c9cbcb', borderRadius: 5 }}>
                        <MaterialCommunityIcons
                          name={item.quantity == 1 ? 'delete-circle' : 'minus'} size={30} onPress={() => {
                            if (item.quantity == 1) {
                              cartStore.removeFromCart(index)
                            } else {
                              let obj = { item, index };
                              cartStore.removeQuantity(obj)
                            }
                          }} />
                        <Text style={{ fontSize: 22 }}>{item.quantity}</Text>
                        <MaterialCommunityIcons
                          name='plus' size={30}
                          onPress={() => {
                            let obj = { item, index };
                            cartStore.addQuantity(obj)
                          }}
                        />
                      </View>
                      <View style={{ width: 150, height: 40, borderRadius: 5, marginLeft: 10, backgroundColor: '#f1f1f1', borderWidth: 1, borderColor: '#c9cbcb', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => cartStore.saveForLater(item)}>
                          <Text style={{ fontSize: 18, color: '#17181a' }}>SAVE FOR LATER</Text>
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
      </View>
    </View >
  )
})
