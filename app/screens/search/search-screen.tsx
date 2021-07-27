import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { Header, HeaderCommon } from "../../components"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useEffect } from "react"
import { WIDTH } from "../../theme/scale"
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores

  const { shoppingStore } = useStores()
  const isFocused = useIsFocused()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const [list, setList] = useState([])
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  var array = []
  useEffect(() => {
    if (isFocused) {
      for (var i = 0; i < shoppingStore.categories.length; i++) {
        shoppingStore.getSearch(shoppingStore.categories[i])
      }
    }
    set_up()
  }, [isFocused])
  function set_up() {
    setList(shoppingStore.searches)
    setFilteredDataSource(shoppingStore.searches)
  }
  const [name, setName] = useState('')
  function searchFilterFunction(text: string) {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not bl
      // Filter the masterDataSource and update FilteredDataSource
      const newData = list.filter(function (item: any) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setName(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(list);
      setName(text);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>

      <HeaderCommon
        LEFT={'back'}
        onLeft={() => {
          navigation.goBack();
          shoppingStore.deleteSearch()
          setName('')
        }}
      />
      <View style={{ flexDirection: 'row', width: '100%', height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
        <TextInput
          placeholder={'Search products here...'}
          value={name}
          onChangeText={data => {
            console.log('its happening')
            shoppingStore.searchFilterFunction(data)
            setName(data)
          }}
          style={{ width: 320, height: 40, backgroundColor: '#fff', borderRadius: 10 }}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10, width: 40, height: 40, backgroundColor: '#fff', borderRadius: 10 }}>
          <Ionicons name='search' size={30} color='black' onPress={
            () => {
              navigation.navigate('visit')
              let obj = { title: name, category: '' }
              shoppingStore.addSearch(obj)
              setName('')
            }
          } />
        </View>

      </View>
      <View>
        <FlatList
          data={(name != '') ? shoppingStore.searches.toJSON() : shoppingStore.searchhistory.toJSON()}
          renderItem={({ item, index }) => (
            <View style={{ width: '100%', marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'grey', flexDirection: 'row' }}>
              <View style={{ width: WIDTH(340) }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('itemlist', { name: item.category });
                  shoppingStore.addSearch(item)
                  shoppingStore.deleteSearch()
                  setName('')
                }}>
                  <Text style={{ fontSize: 18, color: shoppingStore.dark ? '#fff' : 'black' }}>{item.title}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ right: 0, position: 'absolute' }}>
                {(name != '') ? <Feather name='arrow-up-left' size={25} onPress={() => {
                  setName(item.title)
                  shoppingStore.searchFilterFunction(item.title)
                }} /> : <Entypo name='cross' size={25} onPress={() => shoppingStore.removeSearch(index)} />}
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
})
