import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, Platform, PermissionsAndroid, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import Geolocation from 'react-native-geolocation-service';
import { HEIGHT } from "../../theme/scale"
import { typography } from "../../theme"
//import Geocoder from 'react-native-geocoding'
export const UserInfoScreen = observer(function UserInfoScreen() {
  // Pull in one of our MST stores
  const { cartStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  function getAddressFromCoordinates(latitude: number, longitude: number) {
    return new Promise((resolve) => {
      const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${latitude}%2C${longitude}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs`;
      fetch(url)
        .then(res => res.json())
        .then((resJson) => {
          // the response had a deeply nested structure :/
          console.log(resJson)
          if (resJson
            && resJson.Response
            && resJson.Response.View
            && resJson.Response.View[0]
            && resJson.Response.View[0].Result
            && resJson.Response.View[0].Result[0]) {
            resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
            console.log(resJson.Response.View[0].Result[0].Location.Address.Label)
          } else {
            // resolve()
            console.log('something')
          }
        })
        .catch((e) => {
          console.log('Error in getAddressFromCoordinates', e)
          //resolve()
        })
    })
  }



  async function perm() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
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
        getAddressFromCoordinates(position.coords.latitude, position.coords.longitude)
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
      <View style={{ marginHorizontal: 10, height: HEIGHT(200), borderTopWidth: 3, justifyContent: 'center', marginTop: 10, backgroundColor: '#e8acd1' }} >
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontFamily: typography.code, alignSelf: 'center' }}>YOUR ADDRESS  </Text>
          <Text style={{ fontSize: 20, fontFamily: typography.code }}>latitude : {cartStore.location_latitude}</Text>
          <Text style={{ fontSize: 20, fontFamily: typography.code }}>longitude : {cartStore.location_longitude}</Text>
        </View>
        <View style={{ marginHorizontal: 10, bottom: 0, marginTop: 10 }}>
          <View>
            <Button title='KEEP DEVICE LOCATION' onPress={() => perm()} color='#c9645d' />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button title='ENTER LOCATION MANUALLY' color='#687cc4' onPress={() => navigation.navigate('address')} />
          </View>
        </View>
      </View>
      <View style={{ bottom: 10, position: 'absolute', width: '100%' }}>
        <View style={{ marginHorizontal: 10 }}>
          <Button title='PROCEED TO PAY' color='#7a1754' onPress={() => { navigation.navigate('confirm') }} />
        </View>
      </View>
    </View >
  )
})
