import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { HeaderCommon } from "../../components"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import FontAwesome from "react-native-vector-icons/FontAwesome"
export const FeedbackScreen = observer(function FeedbackScreen() {
  // Pull in one of our MST stores
  const { shoppingStore, commentStore } = useStores()
  const route = useRoute<any>()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  let array = ['1', '2', '3', '4', '5']
  const [num, setNum] = React.useState<number>(0)
  const [load, setLoad] = React.useState<boolean>()
  const [flag, setFlag] = React.useState<boolean>(false)
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
  console.log(OBJ)
  React.useEffect(() => {
    if (isFocused) {
      setLoad(true)
      finding()
      //setLoad(false)
    }
  }, [isFocused])
  function finding() {
    var count = 0;
    for (var i = 0; i < commentStore.ratings.length; i++) {
      if (commentStore.ratings[i].title == route.params.user.title) {
        setNum(commentStore.ratings[i].value)
      } else {
        count++;
      }
    }
    if (count == commentStore.ratings.length) {
      setNum(0)
    }
    console.log(num)
    setLoad(false)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderCommon
        LEFT={'back'}
        RIGHT={'cart'}
        onLeft={() => {
          shoppingStore.deleteSearch()
          navigation.goBack()
          setFlag(false)
          commentStore.setAsItIs()
        }}
        onRight={() => navigation.navigate('cart')}
      />
      <View>
        <View>
          {load == false && flag == false && <View style={{ height: 77, width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>Rate The Product</Text>

            <View style={{ flexDirection: 'row' }}>
              <FlatList
                horizontal={true}
                data={array}
                renderItem={({ item, index }) => (
                  <View style={{ margin: 10 }}>
                    <FontAwesome name={(index + 1) > num ? 'star-o' : 'star'} color={(index + 1) > num ? 'black' : 'gold'} size={30} onPress={() => {
                      let obj = { OBJ, value: (index + 1) }
                      commentStore.giveRating(obj)
                      finding()
                    }} />
                  </View>
                )}
                keyExtractor={index => String(index)}
              />
              <Text style={{ fontSize: 20, marginTop: 10, marginRight: 10 }}>{num} out of 5</Text>
            </View>
          </View>}

          {flag == true &&
            <View style={{ height: 77, width: '100%', backgroundColor: 'navy', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => {
                commentStore.deleteComment()
                setFlag(false)
              }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>DELETE</Text>
              </TouchableOpacity>
            </View>}
        </View>

        <FlatList
          data={commentStore.comments.toJSON()}
          renderItem={({ item, index }) => (
            <View>
              {(item.title == route.params.user.title) &&
                <TouchableWithoutFeedback
                  onLongPress={() => {
                    setFlag(true)
                    commentStore.editComment(index)
                  }}
                  onPress={() => {
                    setFlag(false)
                    commentStore.setAsItIs()
                  }}
                >

                  <View
                    style={{
                      backgroundColor: item.flag ? 'pink' : '#0078fe',
                      padding: 10,
                      marginLeft: '45%',
                      borderRadius: 5,
                      marginTop: 10,
                      marginRight: '5%',
                      maxWidth: '50%',
                      alignSelf: 'flex-end',
                    }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>{item.text}</Text>
                    <Text style={{ right: 0 }}>{item.time}</Text>

                    <View style={[styles.rightArrow, { backgroundColor: item.flag ? 'pink' : '#0078fe' }]}></View>

                    <View style={styles.rightArrowOverlap}></View>
                  </View>
                </TouchableWithoutFeedback>
              }
            </View>
            // <View >
            //   {(item.title == route.params.user.title) &&
            //     <View style={{ flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
            //       <View>
            //         <Text style={{ fontSize: 25, marginLeft: 5 }}>{item.text}</Text>
            //         <Text style={{ fontSize: 20, color: 'grey', marginLeft: 5 }}>{item.time}</Text>
            //       </View>
            //       <Entypo style={{ right: 20, position: 'absolute' }}
            //         name='cross' size={30} onPress={() => commentStore.deleteComment(index)} />
            //     </View>}
            // </View>
          )}
          keyExtractor={(index: any) => String(index)}
        />
      </View>
    </View>
  )
})
const styles = StyleSheet.create({
  rightArrow: {
    position: 'absolute',

    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#fff',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },
});
///////////            let array=queeen.filter((act)=>act.flag!==true);
