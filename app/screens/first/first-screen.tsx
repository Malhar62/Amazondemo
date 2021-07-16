import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, Button, TouchableOpacity, FlatList, ImageBackground, Alert } from "react-native"
import { Header, Screen } from "../../components"
import { DrawerActions, useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { useEffect } from "react"


export const FirstScreen = observer(function FirstScreen() {
  // Pull in one of our MST stores
  const { characterStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      characterStore.getData(0);
      characterStore.activePath('DASHBOARD')
      if (characterStore.result == false) {
        characterStore.getData(0);
      }
    }
  }, [isFocused])
  return (
    <ImageBackground source={require('../demo/mainback.png')} style={{ flex: 1 }}>
      <Header
        headerText={'DASHBOARD'}
        rightIcon={'menu1'}
        onRightPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: 300 }}>
          {characterStore.isLoading == false && <FlatList
            data={characterStore.users}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('second', { id: item.id, name: item.name })}>
                <View style={{ width: 150, height: 60, borderWidth: 1, borderColor: '#fff', marginTop: 30, justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 20, color: '#fff' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />}
        </View>
      </View>
    </ImageBackground>
  )
})
