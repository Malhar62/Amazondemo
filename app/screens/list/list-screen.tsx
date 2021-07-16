import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList, View, Text, Button, Dimensions } from "react-native"
import { Screen, } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const ListScreen = observer(function ListScreen() {
  // Pull in one of our MST stores
  const { apiStore } = useStores()
  React.useEffect(
    () => navigation.addListener('focus', () => {
      calling()
    }),
    []
  );
  // Pull in navigation via hook
  const navigation = useNavigation()
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  async function calling() {
    await apiStore.getUserList(page)
    setList(apiStore.lists.toJSON())
  }

  async function delSelected(id: number) {
    let obj = { id, page }
    await apiStore.deleteUserList(obj)
    setList(apiStore.lists)
  }
  async function Randle() {
    if (page < 3) {
      setPage(page + 1)
      console.log('ended : ' + page)
      await apiStore.getUserList(page)
      setList(apiStore.lists.toJSON())
    }
  }
  async function Counting() {
    let obj = { name: 'Malhar', pantone_value: 'Pandya', year: 2062, color: 'red' }
    await apiStore.postUserList(obj)
  }
  async function putting(item: any) {
    let obj = { id: item.id, pantone_value: item.pantone_value, name: item.name, year: item.year, color: item.color, page }
    await apiStore.putUserList(obj)
  }
  return (
    <Screen style={ROOT} >
      <View style={{ flex: 1, height: Dimensions.get('window').height }}>
        <Button title='add' onPress={() => Counting()} />
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <View style={{ width: 300, height: 120, borderWidth: 1, marginTop: 20, marginLeft: 20, backgroundColor: item.color }}>
              <Text style={{ fontSize: 20 }}>{item.id}</Text>
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
              <Text style={{ fontSize: 20 }}>{item.pantone_value}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button title='PUT' onPress={() => putting(item)} />
                <Button title='DELETE' onPress={() => delSelected(item.id)} />
              </View>
            </View>
          )}
          keyExtractor={index => index.toString()}
          ListFooterComponent={() =>
            <View style={{ alignSelf: 'center', height: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title='load more' onPress={() => Randle()} />
              <Button title='go back' onPress={() => navigation.navigate('demoList')} />
            </View>}
        // onEndReached={Randle}
        //onEndReachedThreshold={0.5}
        />
      </View>
    </Screen>
  )
})
