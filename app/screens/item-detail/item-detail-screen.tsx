import React, { useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, Image, ScrollView, Button, TextStyle, Alert, FlatList, TouchableOpacity, TextInput } from "react-native"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { BottomView, HeaderCommon } from "../../components"
import { typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState } from "react"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from "moment"
export const ItemDetailScreen = observer(function ItemDetailScreen() {
  // Pull in one of our MST stores
  const { cartStore, shoppingStore, commentStore } = useStores()
  const route = useRoute<any>()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [name, setName] = useState<string>()
  const [list, setList] = useState<any>()
  const [load, setLoad] = React.useState<boolean>()
  const TEXT: TextStyle = {
    fontSize: 20, marginTop: 20, fontFamily: typography.secondary, color: shoppingStore.dark ? '#fff' : 'black'
  }
  const TEXT1: TextStyle = {
    fontSize: 25, fontFamily: typography.code, color: shoppingStore.dark ? '#fff' : 'black', marginLeft: 5
  }
  function logo(value: any) {
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
  useEffect(() => {
    if (isFocused) {
      ADDING()
    }
  }, [isFocused])
  function ADDING() {
    var array = []
    for (var i = 0; i < commentStore.comments.length; i++) {
      if (commentStore.comments[i].title == route.params.user.title) {
        array.push(commentStore.comments[i])
      }
    }
    setList(array.slice(0, 6))
  }
  function TOP() {

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
    return (
      <View style={{}}>
        <Text style={[TEXT1, { fontSize: 20 }]}>{route.params.user.title}</Text>
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
        <Text style={[TEXT1, { fontSize: 20 }]}>{route.params.user.description}</Text>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <TouchableOpacity onPress={() => {
            let OBJ = {
              id: route.params.user.id,
              title: route.params.user.title,
              category: route.params.user.category,
              description: route.params.user.description,
              price: route.params.user.price,
              image: route.params.user.image,
              quantity: 1,
              isfav: false
            }
            navigation.navigate('feedback', { user: OBJ })
          }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Post Your Feedback</Text>
          </TouchableOpacity>
        </View>
        {INPUT()}
      </View>

    )
  }
  function INPUT() {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
        <TextInput
          placeholder='post feedback...'
          placeholderTextColor={'black'}
          placeholderStyle={{ fontSize: 20 }}
          value={name}
          onChangeText={text => setName(text)}
          style={{ width: 340, height: 40, borderWidth: 1, borderRadius: 5, alignSelf: 'center', backgroundColor: '#ebeef2' }}
        />
        <MaterialCommunityIcons name='send-circle-outline' color='navy' size={50} onPress={() => {
          let obj = { title: route.params.user.title, text: name, flag: false, time: moment().format('MMMM Do YYYY, h:mm:ss a') }
          commentStore.postComment(obj)
          setName('')
          ADDING()
          //console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
        }} />
      </View>
    )
  }
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

      {load == false &&

        <View style={{}}>

          <FlatList
            data={list}
            maxToRenderPerBatch={6}
            renderItem={({ item, index }) => (
              <View style={{
                marginHorizontal: 10,
                borderColor: 'grey',
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderTopWidth: index == 0 ? 1 : 0,
                borderBottomWidth: index == (list.length - 1) ? 1 : 0,
                backgroundColor: '#ebeef2',
                borderTopRightRadius: index == 0 ? 10 : 0,
                borderTopLeftRadius: index == 0 ? 10 : 0,
                borderBottomLeftRadius: index == (list.length - 1) ? 10 : 0,
                borderBottomRightRadius: index == (list.length - 1) ? 10 : 0

              }}>
                {(item.title == route.params.user.title) &&
                  <TouchableOpacity
                    onPress={() => {
                      let OBJ = {
                        id: route.params.user.id,
                        title: route.params.user.title,
                        category: route.params.user.category,
                        description: route.params.user.description,
                        price: route.params.user.price,
                        image: route.params.user.image,
                        quantity: 1,
                        isfav: false
                      }
                      navigation.navigate('feedback', { user: OBJ })
                    }}
                  >
                    <View style={{ marginTop: 10 }}>
                      <Text numberOfLines={1} style={{ fontSize: 20, marginLeft: 5 }}>{item.text}</Text>
                      <Text style={{ fontSize: 15, color: 'grey', marginLeft: 5 }}>{item.time}</Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>
            )}
            keyExtractor={index => String(index)}
            ListFooterComponent={<BottomView />}
            ListHeaderComponent={<TOP />}
          />
        </View>
      }
    </View >
  )
})
