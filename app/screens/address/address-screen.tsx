import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, Text, Button, Platform, PermissionsAndroid, TouchableOpacity } from "react-native"
import { Screen, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { useEffect } from "react"
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { Marker, Overlay } from 'react-native-maps';
import MapView from 'react-native-maps'
import { Dimensions } from "react-native"

export const AddressScreen = observer(function AddressScreen() {
  // Pull in one of our MST stores
  const { cartStore, addressStore } = useStores()
  const navigation = useNavigation()
  const [latitude, setLatitude] = useState(37.4219316)
  const [longitude, setLongitude] = useState(-122.0840734)
  const [error, setError] = useState(null)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    setLatitude(37.4219316)
    setLongitude(-122.0840734)
    perm()
    get_location()
  }, [])
  /*Geocoder.init("AIzaSyDMnZJi6LtSq6nYf9P9Sw-yInBpEcKJAhQ");
Geocoder.from(41.89, 12.49)
    .then(json => {
            var addressComponent = json.results[0].address_components[0];
      console.log(addressComponent);
    })
    .catch(error => console.warn(error))*/
  async function perm() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

  }

  async function get_location() {
    Geolocation.getCurrentPosition(

      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      (error) => {
        // See error code charts below.

        setError(error.message)
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 100000
      }
    );
  }
  let obj = {
    latitude: latitude == 0 ? 37.4219316 : latitude,
    longitude: longitude == 0 ? -122.0840734 : longitude,
    latitudeDelta: 0.0122,
    longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height
  }
  const [initial, setInitial] = useState(obj)
  function onChangeValue(initialRegion) {
    setInitial(initialRegion)
    console.log('changed')
  }
  let markers = [
    {
      coordinate: {
        latitude: 37.4219983,
        longitude: -122.084
      },
      title: "initial",
      description: "Description 1",
      id: 1
    },//37.4219983--122.084,
    {
      coordinate: {
        latitude: 37.530032037930,
        longitude: -122.170506
      },
      title: "Ahmedabad",
      description: "Description 2",
      id: 2
    },
    {
      coordinate: {
        latitude: 22.309425,
        longitude: 72.136230
      },
      title: "Gujarat",
      description: "Description 3",
      id: 3
    },
    {
      coordinate: {
        latitude: 28.644800,
        longitude: 77.216721
      },
      title: "Delhi",
      description: "Description 4",
      id: 4
    },
    {
      coordinate: {
        latitude: 19.076090,
        longitude: 72.877426
      },
      title: "Mumbai",
      description: "Description 5",
      id: 5
    }//
  ]
  return (
    <View style={{ flex: 1 }}>

      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ backgroundColor: 'transparent', marginTop: 10 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={markers}
            renderItem={({ item, index }) => (
              <View elevation={5} style={{ marginLeft: 10, borderWidth: 0, backgroundColor: '#fff', borderRadius: 10 }}>
                <TouchableOpacity onPress={() => {
                  setLatitude(item.coordinate.latitude)
                  setLongitude(item.coordinate.longitude)
                  let obj1 = {
                    latitude: item.coordinate.latitude,
                    longitude: item.coordinate.longitude,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height
                  }
                  onChangeValue(obj1)
                }}>
                  <Text style={{ fontSize: 20, marginVertical: 10, marginHorizontal: 10 }}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={initial}
          onRegionChange={onChangeValue}
          showsCompass={true}
          showsPointsOfInterest={false}
          provider="google"
        >

          <Marker
            coordinate={{ latitude: initial.latitude, longitude: initial.longitude }}
            title={initial.longitude.toString()}
          />

        </MapView>
        <View style={{ marginHorizontal: 10, bottom: 10 }}>
          <Button title='done' onPress={() => {
            cartStore.setLocation(initial.latitude, initial.longitude)
            let obj = {
              latitude: initial.latitude,
              longitude: initial.longitude,
              selected: false
            }
            addressStore.addaddress(obj)
            navigation.goBack()
          }} />
        </View>
      </View>

    </View>
  )
})
