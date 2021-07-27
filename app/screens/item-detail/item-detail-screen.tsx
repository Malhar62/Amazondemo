import React, { useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, Image, ScrollView, Button, TextStyle, Alert, FlatList, TouchableOpacity } from "react-native"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { HeaderCommon } from "../../components"
import { typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
export const ItemDetailScreen = observer(function ItemDetailScreen() {
  // Pull in one of our MST stores
  const { cartStore, shoppingStore } = useStores()
  const route = useRoute<any>()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [load, setLoad] = React.useState<boolean>()
  const TEXT: TextStyle = {
    fontSize: 20, marginTop: 20, fontFamily: typography.secondary, color: shoppingStore.dark ? '#fff' : 'black'
  }
  const TEXT1: TextStyle = {
    fontSize: 20, fontFamily: typography.code, color: shoppingStore.dark ? '#fff' : 'black'
  }
  function checkingColor() {
    var count = 0;
    for (var i = 0; i < cartStore.carts.length; i++) {
      if (route.params.user.title != cartStore.carts[i].title) {
        count++;
      }
    }
    if (count == cartStore.carts.length) {
      return '#7297ad'
    } else {
      return '#f1f1f1'
    }
  }
  function addFav() {
    var count = 0;
    for (var i = 0; i < cartStore.carts.length; i++) {
      if (route.params.user.title != cartStore.carts[i].title) {
        count++;
      }
    }
    if (count == cartStore.carts.length) {
      var valve = logo('name')
      if (valve == 'star-o') {
        let obj = {
          id: route.params.user.id,
          price: route.params.user.price,
          title: route.params.user.title,
          description: route.params.user.description,
          category: route.params.user.category,
          image: route.params.user.image,
          quantity: 1,
          isfav: false
        }
        var count = 0;
        for (var i = 0; i < cartStore.favs.length; i++) {
          if (route.params.user.title != cartStore.favs[i].title) {
            count++;
          }
        }
        if (count == cartStore.favs.length) {
          cartStore.addToFav(obj)
        }
      } else {
        var Index = cartStore.favs.findIndex(x => x.title === route.params.user.title);
        cartStore.removeFav(Index)
      }
    } else {
      Alert.alert('Already in Cart !')
    }
  }
  function logo(value) {
    var count = 0;
    for (var i = 0; i < cartStore.favs.length; i++) {
      if (route.params.user.title != cartStore.favs[i].title) {
        count++;
      }
    }
    if (count == cartStore.favs.length) {
      if (value == 'name') {
        return 'star-o'
      } else {
        return shoppingStore.dark ? '#fff' : 'black'
      }
    } else {
      if (value == 'color') {
        return 'gold'
      } else {
        return 'star'
      }
    }
  }
  cartStore.addVisited(route.params.user)
  const scroll = React.createRef<FlatList>();
  const scroll1 = React.createRef<FlatList>();
  const scrollRef = useRef<ScrollView>();

  useEffect(() => {
    setLoad(true)
    if (isFocused) {
      shoppingStore.getSimilar(route.params.user.category)
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true
      });
      setLoad(false)
    }
  }, [isFocused])

  return (
    <View style={{ flex: 1, backgroundColor: shoppingStore.dark ? 'black' : '#fff' }}>
      <HeaderCommon
        LEFT={'back'}
        RIGHT={'cart'}
        onLeft={() => {
          shoppingStore.deleteSearch()
          navigation.goBack()
        }}
        onRight={() => navigation.navigate('cart')}
      />
      {load == false && <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        style={{ height: '92%', marginHorizontal: 5 }}>
        <View style={{}}>
          <Text style={TEXT1}>{route.params.user.title}</Text>
          <Image source={{ uri: route.params.user.image }} style={{ width: WIDTH(250), height: HEIGHT(200), alignSelf: 'center', marginTop: 20 }} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={[TEXT, { fontWeight: 'bold' }]}>Rs.{route.params.user.price}</Text>
            <FontAwesome name={logo('name')} style={{ position: 'absolute', right: 10, marginTop: 20 }} color={logo('color')} size={30} onPress={() => addFav()} />
          </View>
          <Text style={TEXT}>Category : {route.params.user.category}</Text>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <Button title='add to cart' color={checkingColor()} onPress={() => {
              let obj = {
                id: route.params.user.id,
                title: route.params.user.title,
                category: route.params.user.category,
                description: route.params.user.description,
                price: route.params.user.price,
                image: route.params.user.image,
                quantity: 1,
                isfav: false
              }
              cartStore.addToCart(obj)
            }} />
          </View>
          <Text style={TEXT}>About Product :</Text>
          <Text style={[TEXT1]}>{route.params.user.description}</Text>
          <View style={{ borderBottomWidth: 1, marginTop: 10, borderBottomColor: 'grey' }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={[TEXT1, { fontFamily: typography.primary, fontWeight: 'bold' }]}>You might also like</Text>
          <View>
            <FlatList
              ref={scroll1}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={cartStore.visited}
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
                onPress={() => scroll1.current.scrollToOffset({ animated: true, offset: 0 })} //scroll to top
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={[TEXT1, { fontFamily: typography.primary, fontWeight: 'bold' }]}>Similar Products</Text>
          <View>
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
              <FontAwesome5 name='greater-than' size={20} color='#fff'
                onPress={() => scroll.current.scrollToEnd()}  //scroll to bottom
              />

            </View>
          </View>
        </View>
      </ScrollView>}
    </View >
  )
})
