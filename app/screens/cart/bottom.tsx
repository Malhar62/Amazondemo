import React from "react"
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { HEIGHT, WIDTH } from "../../theme/scale"
import Swipeout from 'react-native-swipeout';

export default function BOTTOM({ Data }) {
    const { cartStore, shoppingStore } = useStores()
    const navigation = useNavigation()
    return (
        <View>
            {cartStore.saved.length != 0 &&
                <View style={{ backgroundColor: 'maroon', height: 30 }}>
                    <Text style={{ fontSize: 20, alignSelf: 'center', color: '#fff' }}>::: Saved Items :::</Text>
                </View>}
            <View>
                <FlatList
                    data={Data}
                    renderItem={({ item, index }) => (
                        <Swipeout style={{ height: 200 }}
                            left={
                                [{
                                    text: 'Delete',
                                    backgroundColor: '#e82c58',
                                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                    color: '#fff',

                                    onPress: () => { cartStore.deleteFromSaved(index) }
                                }]
                            }
                            right={
                                [{
                                    text: 'Move to Cart',
                                    backgroundColor: '#f1f1f1',
                                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                    color: 'black',
                                    onPress: () => {
                                        let obj = { item, index }
                                        cartStore.moveToCartFromSaved(obj)
                                    }
                                }]
                            }
                            autoClose={true}
                            backgroundColor='transparent'>
                            <View style={{ height: 200, borderBottomWidth: 1, marginTop: 10, marginHorizontal: 5, justifyContent: 'center', borderBottomColor: '#d9d6c5' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Image source={{ uri: item.image }} style={{ width: WIDTH(120), height: 130 }} />
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('itemdetail', { user: item })}>
                                        <View style={{ marginLeft: 10, width: WIDTH(250), justifyContent: 'space-between', height: HEIGHT(130) }}>
                                            <Text numberOfLines={2} style={{ fontSize: 20, color: shoppingStore.dark ? '#fff' : 'black' }}>{item.title}</Text>
                                            <Text style={{ color: 'grey' }}>{item.category}</Text>
                                            <Text style={{ fontSize: 20, marginTop: 10, color: shoppingStore.dark ? '#fff' : 'black' }}>Rs.{item.price}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Swipeout>
                    )}
                    keyExtractor={item => item.title}
                />
            </View>
        </View>
    )
}