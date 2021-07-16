import React, { useState } from "react"
import { Image, FlatList, View, Text, TouchableOpacity, Button, ImageBackground } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

import Video from 'react-native-video';
import { Header } from "../../components"
export const DemoListScreen = observer(function DemoListScreen() {
  const navigation = useNavigation()
  const route = useRoute()

  const { characterStore } = useStores()

  const Id = route.params.id;
  const Name = route.params.name;
  const Index = route.params.index;
  const Length = route.params.len;
  //const [list, setList] = useState([])
  //const [title, setTitle] = useState('')
  const [name1, setName1] = useState(Name);
  const [load, setLoad] = useState(true)
  const [ind, setInd] = useState(Index)
  React.useEffect(() => {
    console.log('third ' + Id + ' ' + Name)
    setLoad(true)
    characterStore.getData1(Id, ind)
    setLoad(false)

  }, [ind, navigation]);




  return (
    <ImageBackground source={require('./mainback.png')} style={{ flex: 1 }}>
      <Header headerText={characterStore.title}
        onLeftPress={() => navigation.navigate('demo', { id: 0, name: Name, index: Index })}
        onRightPress={() => console.log('Drawer')}
        leftIcon={'back'}
        rightIcon={'menu1'} />

      <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>

        <Button title='< prev' color='navy' onPress={() => {
          if (ind > 0) {
            setInd(ind - 1)
          }
        }} />
        <Button title='next >' onPress={() => {
          if (ind < (Length - 1)) {
            setInd(ind + 1)
          }
        }}
          color='gold' />

      </View>
      <View style={{ alignSelf: 'center' }}>
        {characterStore.isLoading == false && <FlatList
        showsVerticalScrollIndicator={false}
          data={characterStore.subs}
          renderItem={({ item, index }) => (
            <View style={{ alignSelf: 'center', marginTop: 30 }}>
              {item.type == 'Video' &&
                <View style={{ alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.video_cover || item.icon }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                    <Text style={{ color: '#fff', fontSize: 20 }}>{item.caption || item.name}</Text>
                  </View>
                </View>
              }
              {item.type == 'Image' &&
                <View>
                  <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Image source={{ uri: item.url }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                    <Text style={{ color: '#fff', fontSize: 20 }}>{item.caption}</Text>
                  </View>
                </View>
              }
              {item.type == 'GIF' &&
                <View style={{ alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    {item.icon!='' && <Image source={{ uri: item.icon }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
                    <Text style={{ color: '#fff', fontSize: 20 }}>{item.name}</Text>
                  </View>
                </View>
              }
            </View>
          )}
        />}
        {characterStore.isLoading && <Text style={{ alignSelf: 'center', fontSize: 20, color: '#fff' }}>Loading...</Text>}
      </View>
    </ImageBackground>
  )
})
