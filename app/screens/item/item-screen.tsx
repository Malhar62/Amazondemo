import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback, TextStyle, ViewStyle, ActivityIndicator } from "react-native"
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { Header } from "../../components"
import { typography } from "../../theme"
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { HEIGHT, WIDTH } from "../../theme/scale"
const TEXT: TextStyle = { fontSize: 20, alignSelf: 'center', marginTop: HEIGHT(8) }
const MODAL: ViewStyle = { width: '100%', height: HEIGHT(80), backgroundColor: 'white', justifyContent: 'space-between', borderTopEndRadius: 10, borderTopStartRadius: 10, position: 'absolute', bottom: -20 }
const VIEW: ViewStyle = { height: 150, width: '100%', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: '#f1f1f1' }
export const ItemScreen = observer(function ItemScreen() {
  // Pull in one of our MST stores
  const { shoppingStore } = useStores()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const route = useRoute<any>()
  const [load, setLoad] = React.useState<boolean>();
  const [isModalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setLoad(true)
        shoppingStore.getCategoryItem(route.params.name)
        setLoad(false)
      }
    }
  }, [isFocused])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        flag={true}
        URL='data:image/png;base64,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'
        leftIcon='back'
        rightIcon='cart'
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => navigation.navigate('cart')}
      />
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View>
          <View style={{ justifyContent: 'center', height: 40, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


              {shoppingStore.isLoading == false && shoppingStore.items[0].category == route.params.name ?
                <Text style={{ marginLeft: 10, fontSize: 20 }}>{shoppingStore.items.length} Results</Text>
                : <Text style={{ marginLeft: 10, fontSize: 20 }}> 0 Results</Text>
              }

              <FontAwesome name='sort' size={25} onPress={() => setModalVisible(true)} style={{ right: 10 }} />
            </View>
          </View>
          <View style={{ height: HEIGHT(630) }}>
            {shoppingStore.isLoading &&
              <View style={{ flexDirection: 'row', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color="#0000ff" />
                <Text style={{ fontSize: 20, marginLeft: 10 }}>Loading...</Text>
              </View>}
            {load == false && shoppingStore.isLoading == false && shoppingStore.items[0].category == route.params.name &&
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
                          <Text style={{ fontSize: 20, fontFamily: typography.primary }}>{item.title}</Text>
                          <Text style={{ color: 'grey', fontSize: 15 }}>{item.category}</Text>
                          <Text style={{ fontSize: 18 }}>Rs.{item.price}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Modal isVisible={isModalVisible}>
          <View style={MODAL}>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  shoppingStore.sortUp();
                  navigation.navigate('itemlist')
                }}><Text style={TEXT}>{'- Price Low to High -'}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
                shoppingStore.sortDown();
                navigation.navigate('itemlist')
              }}><Text style={TEXT}>{'- Price High to Low -'}</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
})
