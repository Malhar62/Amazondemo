import React from "react"
import { View, Text, TouchableOpacity, FlatList, Image, TextStyle, ViewStyle, ActivityIndicator } from "react-native"
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"

export default function Comp1({ item, index, grid }) {

    // Pull in one of our MST stores
    const { shoppingStore } = useStores()
    const navigation = useNavigation()
    const VIEW: ViewStyle = { height: grid ? 220 : 150, width: grid ? '50%' : '100%', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: '#f1f1f1', borderRightWidth: 1.3, borderRightColor: '#f1f1f1' }

    function COMMON() {
        return (
            <View style={VIEW}>
                <TouchableOpacity onPress={() => navigation.navigate('itemdetail', { user: item })}>
                    <View style={{ flexDirection: grid ? 'column' : 'row' }}>
                        <View style={{ alignSelf: grid ? 'center' : 'auto' }}>
                            <Image source={{ uri: item.image }} style={{ width: WIDTH(100), height: 100 }} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text numberOfLines={2} style={{ fontSize: 18, fontFamily: typography.primary, color: shoppingStore.dark ? '#fff' : 'black' }}>{item.title}</Text>
                            <Text style={{ color: 'grey', fontSize: 15 }}>{item.category}</Text>
                            <Text style={{ fontSize: 18, color: shoppingStore.dark ? '#fff' : 'black' }}>Rs.{item.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    var rem: number = Math.round(shoppingStore.items.length / 2);
    console.log('remindex is bottom:------------> ' + rem)

    if ((rem % 2) == 0) {
        if (index >= rem) {
            return (
                <COMMON />
            )
        } else {
            return (
                <View></View>
            )
        }
    } else {
        if (grid) {
            if (index > rem) {
                return (
                    <COMMON />
                )
            } else {
                return (
                    <View></View>
                )
            }
        } else {
            if (index >= rem) {
                return (
                    <COMMON />
                )
            } else {
                return (
                    <View></View>
                )
            }
        }

    }

}