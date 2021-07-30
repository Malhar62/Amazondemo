import * as React from "react"
import { StyleProp, TextStyle, View, Text, FlatList, ViewStyle, TouchableOpacity, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { HEIGHT, WIDTH } from "../../theme/scale"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { typography } from "../../theme"

import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"

export interface BottomViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const BottomView = observer(function BottomView(props: BottomViewProps) {
  const { style } = props
  const { cartStore, shoppingStore, commentStore } = useStores()
  const route = useRoute<any>()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const TEXT: TextStyle = {
    fontSize: 20, marginTop: 20, fontFamily: typography.secondary, color: shoppingStore.dark ? '#fff' : 'black'
  }
  const TEXT1: TextStyle = {
    fontSize: 25, fontFamily: typography.code, color: shoppingStore.dark ? '#fff' : 'black', marginLeft: 5
  }
  const scroll = React.createRef<FlatList>();
  const scroll1 = React.createRef<FlatList>();

  return (
    <View>
      <TouchableOpacity onPress={() => console.log('feed')}>
        <View style={{ right: 10, position: 'absolute' }}>
          <Text style={{ fontSize: 18, color: 'grey' }}>See more...</Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: 30 }}>
        <Text style={[TEXT1, { fontFamily: typography.primary, fontWeight: 'bold' }]}>You might also like</Text>
        <View>
          <FlatList
            ref={scroll1}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={cartStore.visited}
            renderItem={({ item, index }) => (
              <View style={{ width: 150, marginTop: 10 }}>
                <TouchableOpacity onPress={() => console.log('feed')}>
                  <Image source={{ uri: item.image }} style={{ width: 130, height: 130 }} />
                  <Text numberOfLines={2}
                    style={{ fontSize: 18 }}>{item.title}</Text>
                  <Text style={{ fontSize: 18 }}>Rs.{item.price}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.title}
          />
          <View elevation={5} style={{ right: 0, marginTop: 40, position: 'absolute', justifyContent: 'center', borderWidth: 0, width: 40, height: 40, borderRadius: 20, alignItems: 'center', backgroundColor: 'black' }} >
            <FontAwesome5 name='less-than' size={20} color='#fff'
              onPress={() => scroll1.current.scrollToOffset({ animated: true, offset: 0 })} //scroll to top
            />
          </View>
        </View>
        <View>
          {shoppingStore.similar.length > 0 && <Text style={[TEXT1, { fontFamily: typography.primary, fontWeight: 'bold' }]}>Similar Products</Text>}
          <View style={{ height: HEIGHT(300) }}>
            <FlatList
              ref={scroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={shoppingStore.similar}
              renderItem={({ item, index }) => (
                <View style={{ width: 150, marginTop: 10 }}>
                  <TouchableOpacity>
                    <Image source={{ uri: item.image }} style={{ width: 130, height: 130 }} />
                    <Text numberOfLines={2}
                      style={{ fontSize: 18 }}>{item.title}</Text>
                    <Text style={{ fontSize: 18 }}>Rs.{item.price}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.title}
            />
            <View elevation={5} style={{ right: 0, marginTop: 40, position: 'absolute', justifyContent: 'center', borderWidth: 0, width: 40, height: 40, borderRadius: 20, alignItems: 'center', backgroundColor: 'black' }} >
              <FontAwesome5 name='less-than' size={20} color='#fff'
                onPress={() => scroll.current.scrollToOffset({ animated: true, offset: 0 })} //scroll to top
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
})
