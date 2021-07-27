import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, TouchableOpacity, Button, Alert } from "react-native"
import { Header, HeaderCommon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

export const ConfirmScreen = observer(function ConfirmScreen() {
  // Pull in one of our MST stores
  const { cartStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [flag, setFlag] = useState(false)
  function ordered() {
    cartStore.placeOrder()
    Alert.alert('your order is placed!')
    navigation.navigate('home')
    setFlag(false)
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderCommon
        LEFT={'back'}
        onLeft={() => {
          navigation.goBack();
        }}
      />
      {flag == false && <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <Button title='CONFIRM ORDER ?' color='blue' onPress={() => { }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Button title='yes ! proceed to pay' color='green' onPress={() => setFlag(true)} />
          <Button title='no ! go back to cart' color='red' onPress={() => navigation.goBack()} />
        </View>
      </View>}
      {flag == true && (
        <View style={{ marginHorizontal: 10, justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>SELECT PAYMENT METHOD</Text>
          <View style={{ marginTop: 10 }}>
            <Button title='Cash on delivery' color='navy' onPress={() => ordered()} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button title='online Payment' color='navy' onPress={() => ordered()} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button title='< back' color='navy' onPress={() => { setFlag(false) }} />
          </View>
        </View>
      )}
    </View>
  )
})
