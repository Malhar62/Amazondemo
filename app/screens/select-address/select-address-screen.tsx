import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, TouchableOpacity, FlatList, PermissionsAndroid } from "react-native"
import { HeaderCommon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { RadioButton } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { WIDTH } from "../../theme/scale"


export const SelectAddressScreen = observer(function SelectAddressScreen() {
  // Pull in one of our MST stores
  const { addressStore, cartStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);


  async function perm() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Amazon need to access your location",
          message:
            "",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the gps");
        get_location()
      } else {
        console.log("gps permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async function get_location() {
    Geolocation.getCurrentPosition(

      (position) => {
        cartStore.setLocation(position.coords.latitude, position.coords.longitude)
        let obj = {
          latitude: cartStore.location_latitude,
          longitude: cartStore.location_longitude,
          selected: false
        }
        addressStore.addaddress(obj)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 100000
      }
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderCommon
        LEFT={'back'}
        onLeft={() => navigation.goBack()}
      />
      <View style={{ alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <View style={{ width: WIDTH(380), alignItems: 'center' }}>
            <Text style={{ fontSize: 22, textAlign: 'center', textDecorationLine: 'underline' }}>Saved Addresses</Text>
          </View>
          <View style={{ width: WIDTH(30) }}>
            <Ionicons
              name={isModalVisible ? 'information-circle-sharp' : 'information-circle-outline'} size={30} onPress={() => { setModalVisible(true) }} />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10, alignSelf: 'center' }}>
        <FlatList
          data={addressStore.adds.toJSON()}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <RadioButton
                value=''
                status={item.selected ? 'checked' : 'unchecked'}
                color='orange'
                onPress={() => {
                  cartStore.setLocation(item.latitude, item.longitude)
                  let obj = { item, index }
                  addressStore.editaddress(obj)
                }}
              />
              <View style={{ width: 320, backgroundColor: '#e0c487', paddingLeft: 10, marginLeft: 10 }}>
                <TouchableOpacity onLongPress={() => addressStore.removeaddress(index)}>
                  <Text style={{ fontSize: 20 }}>latitude : {item.latitude}</Text>
                  <Text style={{ fontSize: 20 }}>longitude : {item.longitude}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={index => String(index)}
        />
      </View>
      <View style={{ bottom: 10, position: 'absolute', alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => { navigation.navigate('address') }} style={{ height: 40, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, width: 300, backgroundColor: 'gold', marginBottom: 10, borderRadius: 5 }}>
          <Text style={{ fontSize: 18, color: 'black' }}>ADD MANUALLY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { perm() }} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, width: 300, backgroundColor: 'gold', height: 40, borderRadius: 5 }}>
          <Text style={{ fontSize: 18, color: 'black' }}>KEEP DEVICE LOCATION</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Modal
          onDismiss={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          isVisible={isModalVisible}>
          <View style={{ backgroundColor: '#fff', width: 350, alignSelf: 'center' }}>
            <Text style={{ fontSize: 18, textDecorationLine: 'underline', textAlign: 'center' }}>INSTRUCTIONS</Text>
            <Text style={{ fontSize: 18 }}> 1.Touch Keep Device Location to Keep Your Current Location</Text>
            <Text style={{ fontSize: 18, marginVertical: 5 }}> 2.Touch Manually To Choose Loaction Manually</Text>
            <Text style={{ fontSize: 18 }}> 3.Hold Long On Address To Delete It</Text>
          </View>
        </Modal>
      </View>
    </View >
  )
})
