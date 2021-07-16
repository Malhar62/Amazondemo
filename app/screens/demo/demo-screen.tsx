import React, { useState } from "react"
import { Image, Text, View, FlatList, TouchableOpacity, ImageBackground } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { Header } from "../../components"

export const DemoScreen = observer(function DemoScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { characterStore } = useStores()
  const Id = route.params.id;
  const Name = route.params.name;
  const Index = route.params.index;
  const [list, setList] = useState([])
  const [load, setLoad] = useState(true)
  console.log('----------------------------------' + Id)
  React.useEffect(() => {
    setLoad(true)
    characterStore.getData(Id)
    var array = characterStore.users;
    setList(array[Index].children)
    console.log(array[Index].name)
    setLoad(false)
  }, [[], navigation]);

  return (
    <ImageBackground source={require('./mainback.png')} style={{ flex: 1 }}>
      <Header headerText={Name}
        onLeftPress={() => navigation.navigate('welcome')}
        onRightPress={() => console.log('Drawer')}
        leftIcon={'back'}
        rightIcon={'menu1'} />
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View style={{ height: 300 }}>
          {load == false && <FlatList
            data={list}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                navigation.navigate('demoList', { id: item.parent_id, name: Name, index, len: list.length })
              }}>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                  <Image source={{ uri: item.icon }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                  <Text style={{ fontSize: 20, marginLeft: 20, color: '#fff' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />}
        </View>
      </View>
    </ImageBackground>
  )
})
