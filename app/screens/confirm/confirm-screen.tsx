import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, View, Text, TouchableOpacity, Alert, Image, TextInput, FlatList, ScrollView } from "react-native"
import { Header, HeaderCommon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { HEIGHT, WIDTH } from "../../theme/scale"
import { RadioButton } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { About } from "./About"
import { Bank } from "./Bank"
import { useEffect } from "react"

export const ConfirmScreen = observer(function ConfirmScreen() {
  // Pull in one of our MST stores
  const { paymentStore, cartStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [flag, setFlag] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [show, setShow] = useState<boolean>(false)
  const [online, setOnline] = useState<string>('')
  function ordered() {
    cartStore.placeOrder()
    Alert.alert('your order is placed!')
    navigation.navigate('home')
  }
  useEffect(() => {
    setOnline('')
  }, [])
  function TOP() {
    return (
      <View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10 }}>Select a payment method</Text>
        <View style={{ height: 130, width: WIDTH(370), backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, justifyContent: 'center' }}>
          <View style={{ height: 100, width: WIDTH(360), backgroundColor: '#fce8f9', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
            <View>
              <Image source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT1uAjlRUGaUAZ7Tf5DMaOmmnmvCgk01acTI24dq6dGrnxF5tjFGpyYGlP9a0Bjq1BZWs&usqp=CAU'
              }}
                style={{ width: 50, height: 50, borderRadius: 25 }} />
            </View>
            <View>
              <Text style={{ fontSize: 18 }}>Amazon Pay Later | Buy now & pay</Text>
              <Text style={{ fontSize: 18 }}>Next month or in EMIs</Text>
              <Text style={{ fontSize: 18 }}>Active now.Get flat Rs.100 off</Text>
            </View>
          </View>
        </View>
        <View style={{
          marginTop: 20,
          width: WIDTH(370), height: 50, backgroundColor: '#f2c862', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderRadius: 3
        }}>
          <TouchableOpacity onPress={() => ordered()}>
            <Text style={{ fontSize: 20 }}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={{ fontSize: 16 }}>CREDIT AND DEBIT CARDS</Text>
        </View>
        <View style={{ width: WIDTH(370), height: 150, backgroundColor: '#fff', alignSelf: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, marginLeft: 10 }}>
            <RadioButton
              value=''
              color='orange'
              status={checkingState()}
              onPress={() => paymentStore.credit()}
            />
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginLeft: 5 }}>SBI credit card</Text>
                <Fontisto name='visa' size={20} />
              </View>
              <Text style={{ fontSize: 18, marginLeft: 5 }}>Malhar Pandya</Text>
              <Text style={{ fontSize: 18, marginLeft: 5 }}>Expires on</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                <TextInput
                  placeholder='enter CVV'
                  value={name}
                  onChangeText={data => setName(data)}
                  style={{ width: 150, height: 50, borderColor: 'pink', borderWidth: 3, borderRadius: 5 }}
                />
                <TouchableOpacity onPress={() => setFlag(true)}>
                  <Text style={{ fontSize: 20, color: 'blue', marginLeft: 10 }}>What is CVV?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={{ fontSize: 16 }}>MORE WAYS TO PAY</Text>
        </View>
      </View>
    )
  }


  function BOTTOM() {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ width: WIDTH(370), backgroundColor: '#fff', height: show ? 110 : 50, paddingLeft: 20, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ transform: [{ rotate: show ? '270deg' : '90deg' }], fontSize: 20 }}>{'>'}</Text>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Text style={{ fontSize: 20, marginLeft: 5, color: 'blue' }}>Add Gift card and Promo Code</Text>
            </TouchableOpacity>
          </View>
          {show && <View style={{ alignItems: 'center', width: 330, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                value={code}
                maxLength={5}
                placeholder='enter code...'
                onChangeText={data => setCode(data)}
                style={{ width: 200, height: 50, borderWidth: 1, backgroundColor: '#f1f1f1', borderRadius: 5 }}
              />
              <View style={{ marginLeft: 10, width: 100, height: 50, borderWidth: 1, borderRadius: 5, backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 18 }}>APPLY</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>}
        </View>
        <View style={{
          marginTop: 20,
          width: WIDTH(370), height: 50, backgroundColor: '#f2c862', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderRadius: 3
        }}>
          <TouchableOpacity onPress={() => {
            // for (var i = 0; i < paymentStore.payments.length; i++) {
            //   if (paymentStore.payments[i].flag == true) {
            //     if (paymentStore.payments[i].name == 'UPI/Netbanking') {
            //       setOnline(paymentStore.payments[i].name)
            //     } else {
            //       if (paymentStore.payments[i].name == 'Add Debit/Credit/ATM Card') {
            //         navigation.navigate('addcard')
            //       }
            //     }
            //   }
            // }
          }}>
            <Text style={{ fontSize: 20 }}>Continue</Text>
          </TouchableOpacity>
        </View>
        <About
          flag={flag}
          backing={() => setFlag(false)}
        />
      </View >
    )
  }
  function checkingState() {
    var count = 0;
    for (var i = 0; i < paymentStore.payments.length; i++) {
      if (paymentStore.payments[i].flag == true) {
        count++;
      }
    }
    if (count != 0) {
      return 'unchecked'
    } else {
      return 'checked'
    }
  }
  return (
    <View style={{
      flex: 1,
      //backgroundColor: online == 'UPI/NETbanking' && '#000', opacity: online == 'UPI/NETbanking' ? (0.2) : 0
    }}>
      <HeaderCommon
        LEFT={'back'}
        onLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={{ alignSelf: 'center', height: HEIGHT(670) }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={paymentStore.payments.toJSON()}
            renderItem={({ item, index }) => (
              <View style={{ alignItems: 'center', paddingLeft: 10, flexDirection: 'row', width: WIDTH(370), height: 60, backgroundColor: '#fff', marginTop: 5 }}>
                <RadioButton
                  value={''}
                  color='orange'
                  status={item.flag ? 'checked' : 'unchecked'}
                  onPress={() => {
                    paymentStore.selection(index);
                    setOnline(item.name)
                    if (item.name == 'Add Debit/Credit/ATM Card') {
                      navigation.navigate('addcard')
                    }
                  }}
                />
                <Text>{item.name}</Text>
              </View>
            )}
            keyExtractor={item => item.name}
            ListHeaderComponent={<TOP />}
            ListFooterComponent={<BOTTOM />}
          />
        </View>
        <View>
          {online == 'UPI/Netbanking' &&
            <View>
              <Bank
                flag={online}
                backing={() => setOnline('')}
              />
            </View>}
        </View>
      </View>
      {/* {flag == false && <View style={{ marginHorizontal: 10, marginTop: 10 }}>
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
      )} */}
    </View>
  )
})
