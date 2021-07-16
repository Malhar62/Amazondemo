import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, Text, FlatList, Image, View, TouchableHighlight } from "react-native"
import { FormRow, Header } from "../../components"
import { useNavigation, useRoute, useIsFocused, DrawerActions } from "@react-navigation/native"
import { useStores } from "../../models"


export const ThirdScreen = observer(function ThirdScreen() {
  // Pull in one of our MST stores
  const { characterStore } = useStores()
  const route = useRoute<any>()
  const ID = route.params.id;
  var INDEX = route.params.index;
  const NAME = route.params.name;
  const title = route.params.title;
  const ICON = route.params.icon;
  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [list, setList] = useState([])
  const [load, setLoad] = useState(false)
  React.useEffect(() => {
    if (isFocused) {
      console.log('****************************************************')
      console.log(ID + '  ' + INDEX + '  ' + NAME + '  ')
    }
  }, [isFocused, navigation])

  React.useEffect(() => {
    if (isFocused) {
      characterStore.getData1(route.params.id)
      /*if (characterStore.result == false) {
        characterStore.getData1(route.params.id)
      }*/
      //console.log(INDEX + ' && ' + characterStore.subs[INDEX].has_child)
      console.log(characterStore.subs[route.params.index].has_child)
      var answer = characterStore.subs[route.params.index].has_child;
      setLoad(answer)
      setTimeout(() => {
        if (answer == true) {
          setList(characterStore.subs[route.params.index].children)
        } else {
          setList(characterStore.subs[route.params.index].media)
        }
      }, 500)
      console.log(list)
      let obj = { id: route.params.id, name: route.params.name, index: route.params.index, icon: route.params.icon, title };
      // console.log('obj : ' + obj.INDEXex + ' ' + obj.name)
      characterStore.addHistory(obj);
    }
  }, [isFocused, INDEX]);


  return (
    <ImageBackground source={require('../demo/mainback.png')} style={{ flex: 1 }}>
      <Header
        headerText={NAME}
        rightIcon={'menu1'}
        leftIcon={'back'}
        onLeftPress={() =>
          navigation.navigate('second', { id: ID, name: title })}
        onRightPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <View style={{ marginTop: 10 }}>
        <FormRow
          onLeft={() => {

            if (INDEX > 0) {
              navigation.navigate('third',
                {
                  index: (INDEX - 1),
                  name: characterStore.subs[INDEX - 1].name,
                  icon: characterStore.subs[INDEX - 1].icon,
                  id: ID,
                  title,
                  flag: 'second'
                })
              // id: ID, index, name: item.name, title: NAME, icon: item.icon, flag: 'second'
              //setInd(INDEX - 1)
              //setHead(characterStore.subs[INDEX - 1].name)
              //setImg(characterStore.subs[INDEX - 1].icon)
            }
          }}
          onRight={() => {

            if (INDEX < (characterStore.subs.length - 1)) {
              navigation.navigate('third',
                {
                  index: (INDEX + 1),
                  name: characterStore.subs[INDEX + 1].name,
                  icon: characterStore.subs[INDEX + 1].icon,
                  id: ID,
                  title,
                  flag: 'second'
                })
              //console.log(characterStore.subs[INDEX + 1].name)
              // setInd(INDEX + 1)
              //setHead(characterStore.subs[INDEX + 1].name)
              //setImg(characterStore.subs[INDEX + 1].icon)
            }
          }} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {characterStore.isLoading == false && <FlatList
          showsVerticalScrollIndicator={false}
          data={load ? characterStore.subs[route.params.index].children : characterStore.subs[route.params.index].media}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 10 }}>
              {item.type == 'Image' &&
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  {item.url != '' &&
                    <Image source={{ uri: item.url }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
                  <Text style={{ color: '#fff', fontSize: 20 }}>{item.caption}</Text>
                </View>
              }

              {item.type == 'Video' &&
                <View style={{ alignItems: 'center' }}>
                  {(item.video_cover) &&
                    <View>
                      <Text style={{ color: '#fff', fontSize: 20 }}>its Video</Text>
                      <TouchableHighlight onPress={() => navigation.navigate('form', { icon: ICON, id: ID, name: NAME, INDEXex: INDEX, title, URL: item.url })}>
                        <Image source={{ uri: item.video_cover }} style={{ width: 60, height: 60 }} />
                      </TouchableHighlight>
                    </View>}
                  {item.icon != '' && <Image source={{ uri: item.icon }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
                  {item.name != '' && <Text style={{ color: '#fff', fontSize: 20 }}>{item.name}</Text>}
                </View>
              }
              {item.type == 'GIF' &&
                <View>
                  {item.icon != '' && <Image source={{ uri: item.icon }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
                  {item.name != '' && <Text style={{ color: '#fff', fontSize: 20 }}>{item.name}</Text>}
                </View>
              }
            </View>
          )}
        />}
      </View>
    </ImageBackground >
  )
})
