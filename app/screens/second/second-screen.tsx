import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Image, TouchableOpacity, Text, FlatList, ImageBackground } from "react-native"
import { Header } from "../../components"
import { useIsFocused, useNavigation, useRoute, DrawerActions } from "@react-navigation/native"
import { useStores } from "../../models"

export const SecondScreen = observer(function SecondScreen() {
  const { characterStore } = useStores()
  const route = useRoute<any>()
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const ID = route.params.id;
  const NAME = route.params.name;
  const [load, setLoad] = useState(true);
  React.useEffect(() => {
    if (isFocused) {
      setLoad(true)
      characterStore.getData1(route.params.id)
      setLoad(false)
      characterStore.activePath(NAME)

      if (characterStore.result == false) {
        characterStore.getData1(route.params.id)
      }
    }
  }, [isFocused, route.params.id, characterStore.result]);

  return (
    <ImageBackground source={require('../demo/mainback.png')} style={{ flex: 1 }}>
      <Header
        headerText={NAME}
        leftIcon={'back'}
        rightIcon={'menu1'}
        onLeftPress={() => navigation.navigate('first')}
        onRightPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: NAME == 'LEARN' ? 700 : 300 }}>
          {characterStore.isLoading == false && load == false && <FlatList
            showsVerticalScrollIndicator={false}
            data={characterStore.subs}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('third', { id: ID, index, name: item.name, title: NAME, icon: item.icon, flag: 'second' })}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  {item.icon != '' && <Image source={{ uri: item.icon }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
                  <Text style={{ color: '#fff' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />}
        </View>
      </View>
    </ImageBackground>
  )
})
